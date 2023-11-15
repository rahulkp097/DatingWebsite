import { Box } from '@chakra-ui/react';
import React from 'react';
import SideDrawer from './miscellaneous/SideDrawer';
import MyChat from './miscellaneous/MyChat';
import ChatBox from './miscellaneous/ChatBox';

function ChatComponent() {
  return (
    <div style={{ width: "100% "}}>
  

      <SideDrawer />
      <Box
  display="flex"
  justifyContent="space-between"
  w="100%"
  h="91.5vh"
  p="10px"

>
  <MyChat />
  <ChatBox />
</Box>

    </div>
  );
}

export default ChatComponent;
