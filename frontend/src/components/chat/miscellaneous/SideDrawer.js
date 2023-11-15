import { Avatar, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, useDisclosure, useToast } from '@chakra-ui/react';
import { Tooltip } from '@chakra-ui/react'; 
import { BellIcon, ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ProfileModel from './ProfileModel';
import ChatLoading from '../ChatLoading';
import UserListItem from '../UserAvatar/UserListItem';
import { ChatState } from '../../../Context/ChatProvider';
import { useAccessUserChatMutation, useSearchChatUserMutation } from '../../../slices/userApiSlice';
import { getSender } from '../../../config/ChatLogics';
 
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';
function SideDrawer() {
  const { userInfo } = useSelector((state) => state.auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
const [search,setSearch]=useState("")
const [searchResult, setSearchResult] = useState([]);
const [loading, setLoading] = useState(false);
const [loadingChat, setLoadingChat] = useState(false);

const {
  setSelectedChat,
  user,
  notification,
  setNotification,
  chats,
  setChats,
} = ChatState();

const toast=useToast()
const [chatSearchAPi]=useSearchChatUserMutation()
const [AccessUserChatApi]=useAccessUserChatMutation()

const handleSearch = async () => {
  if (!search) {
    toast({
      title: "Please Enter something in search",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "top-left",
    });
    return;
  }

  try {
    setLoading(true);
    const res = await chatSearchAPi(search).unwrap()
    setLoading(false);
    setSearchResult(res);
  } catch (error) {
    toast({
      title: "Error Occured!",
      description: "Failed to Load the Search Results",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom-left",
    });
  }
};

const accessChat=async(userId)=>{
  
  try {
    setLoadingChat(true)
    const data=await AccessUserChatApi({userId}).unwrap()

    if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
    setSelectedChat(data);
    setLoadingChat(false);
    onClose();
  } catch (error) {
    toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
  }
}


  return (
    <>
    <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    bg="white"
    w="100%"
    p="5px 10px 5px 10px"
    borderWidth="5px"
  >
    <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
      <Button variant="ghost" onClick={onOpen}>
        <i className="fas fa-search"></i>
        <Text display={{ base: "none", md: "flex" }} px={4}>
          Search User
        </Text>
      </Button>
    </Tooltip>
    <Text fontSize="2xl" fontFamily="Work sans">
      Talk-A-Tive
    </Text>
    <div>
      <Menu>
        <MenuButton p={1}>
          <NotificationBadge
            count={notification.length}
            effect={Effect.SCALE}
          />
          <BellIcon fontSize="2xl" m={1} />
        </MenuButton>
        <MenuList pl={2}>
          {!notification.length && "No New Messages"}
          {notification.map((notif) => (
            <MenuItem
              key={notif._id}
              onClick={() => {
                setSelectedChat(notif.chat);
                setNotification(notification.filter((n) => n !== notif));
              }}
            >
              {notif.chat.isGroupChat
                ? `New Message in ${notif.chat.chatName}`
                : `New Message from ${getSender(user, notif.chat.users)}`}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
          <Avatar
            size="sm"
            cursor="pointer"
            name={user.name}
            src={user.pic}
          />
        </MenuButton>
        <MenuList>
          <ProfileModel user={user}>
            <MenuItem>My Profile</MenuItem>{" "}
          </ProfileModel>
          <MenuDivider />
          {/* <MenuItem onClick={logoutHandler}>Logout</MenuItem> */}
        </MenuList>
      </Menu>
    </div>
  </Box>

  <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
    <DrawerOverlay />
    <DrawerContent>
      <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
      <DrawerBody>
        <Box display="flex" pb={2}>
          <Input
            placeholder="Search by name or email"
            mr={2}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={handleSearch}>Go</Button>
        </Box>
        {loading ? (
          <ChatLoading />
        ) : (
          searchResult?.map((user) => (
            <UserListItem
              key={user._id}
              user={user}
              handleFunction={() => accessChat(user._id)}
            />
          ))
        )}
        {loadingChat && <Spinner ml="auto" display="flex" />}
      </DrawerBody>
    </DrawerContent>
  </Drawer>
</>
  );
}

export default SideDrawer;
