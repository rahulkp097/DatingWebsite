import React, { useEffect, useState } from "react";
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import {
  useGetAllmessagesMutation,
  useSendMessageMutation,
} from "../../../slices/userApiSlice";
import { IconButton, Spinner, useToast } from "@chakra-ui/react";
import io from "socket.io-client";
import ScrollableChat from "./ScrollableChat";
import { ChatState } from "../../../Context/ChatProvider";
import { getSender, getSenderFull } from "../../../config/ChatLogics";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModel from "./ProfileModel";
import { useSelector } from "react-redux";
import Lottie from "react-lottie";
import animationData from "../Animation/TypingAnimation.json";
import "./Style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const ENDPOINT = "https://youandmelove.me";

var socket, selectedChatCompare;

function SingleChat({ fetchAgain, setFetchAgain }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { selectedChat, setSelectedChat, user, notification, setNotification } =
    ChatState();

  const [messageSendApi] = useSendMessageMutation();
  const [getUserMessagesApi] = useGetAllmessagesMutation();

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      setLoading(true);
      const chatId = selectedChat._id;

      const { messages } = await getUserMessagesApi(chatId).unwrap();

      setMessages(messages);

      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat?._id);
      try {
        setNewMessage("");

        const content = newMessage;
        const chatId = selectedChat?._id;
        const data = await messageSendApi({ content, chatId }).unwrap();

        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  const videoCallHandler = async () => {
    try {
      setNewMessage("");
      const chatId = selectedChat._id;

      const Url = `https://youandmelove.me/videocall/${chatId} `;

      const content = `you have a videocall request from ${user.name}, use this link to join : ${Url}`;

      const data = await messageSendApi({ content, chatId }).unwrap();

      socket.emit("new message", data);
      setMessages([...messages, data]);
      navigate(`/videocall/${chatId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {messages &&
              (!selectedChat.isGroupChat ? (
                <>
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      userInfo.subscription &&
                      userInfo.subscription.planName === "Premium Plan" &&
                      videoCallHandler()
                    }
                  >
                    {userInfo.subscription &&
                    userInfo.subscription.planName === "Premium Plan" ? (
                      <FontAwesomeIcon icon={faVideo} />
                    ) : (
                      <div
                        onClick={() => {
                          // Show toast indicating the need for a premium plan
                          return toast({
                            title:
                              "You need a premium plan to access video calls",
                            status: "error",
                            duration: 5000,
                            isClosable: true,
                            position: "top-right",
                          });
                        }}
                      >
                        <FontAwesomeIcon icon={faVideo} />
                      </div>
                    )}
                  </div>

                  {getSender(user, selectedChat.users)}
                  <ProfileModel
                    user={getSenderFull(user, selectedChat.users)}
                  />
                </>
              ) : (
                <></>
              ))}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}

            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
              {istyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )}
              <Input
                variant="filled"
                bg="#736c71"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        // to get socket.io on same page
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
}

export default SingleChat;
