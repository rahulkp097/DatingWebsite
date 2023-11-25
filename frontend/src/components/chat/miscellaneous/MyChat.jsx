import React, { useEffect, useState } from 'react'
import { AddIcon } from "@chakra-ui/icons"; 

import { Box, useToast, Stack, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Button } from "@chakra-ui/react";
import { getSender } from '../../../config/ChatLogics';
import ChatLoading from '../ChatLoading';
import { useGetUserChatMutation } from '../../../slices/userApiSlice';
import { ChatState } from '../../../Context/ChatProvider';

function MyChat({fetchAgain}) {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();
  
  const { userInfo } = useSelector((state) => state.auth);
 

  const [getUserChatsApi]=useGetUserChatMutation()
  const fetchChats = async () => {
    try {
      
      const data = await getUserChatsApi().unwrap()
      
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    if (userInfo) {
      setLoggedUser(userInfo);
      fetchChats();
    }
  }, [fetchAgain, userInfo]);
  

  return (
    <Box
    display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
    flexDir="column"
    alignItems="center"
    p={3}
    bg="white"
    w={{ base: "100%", md: "31%" }}
    borderRadius="lg"
    borderWidth="1px"
  >
    <Box
      pb={3}
      px={3}
      fontSize={{ base: "28px", md: "30px" }}
      fontFamily="Work sans"
      display="flex"
      w="100%"
      justifyContent="space-between"
      alignItems="center"
    >
      My Chats
     
    </Box>
    <Box
      display="flex"
      flexDir="column"
      p={3}
      bg="#F8F8F8"
      w="100%"
      h="100%"
      borderRadius="lg"
      overflowY="hidden"
    >
      {chats ? (
        <Stack overflowY="scroll">
          {chats.map((chat) => (
            <Box
              onClick={() => setSelectedChat(chat)}
              cursor="pointer"
              bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
              color={selectedChat === chat ? "white" : "black"}
              px={3}
              py={2}
              borderRadius="lg"
              key={chat._id}
            >
              <Text>
                {!chat.isGroupChat
                  ? getSender(loggedUser, chat.users)
                  : chat.chatName}
              </Text>
              {chat.latestMessage && (
                <Text fontSize="xs">
                  <b>{chat?.latestMessage?.sender?.name} : </b>
                  {chat.latestMessage.content.length > 50
                    ? chat.latestMessage.content.substring(0, 51) + "..."
                    : chat.latestMessage.content}
                </Text>
              )}
            </Box>
          ))}
        </Stack>
      ) : (
        <ChatLoading />
      )}
    </Box>
    </Box>
  )
}

export default MyChat