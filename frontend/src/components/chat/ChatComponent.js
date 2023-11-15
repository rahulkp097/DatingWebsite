import { Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import SideDrawer from './miscellaneous/SideDrawer';
import MyChat from './miscellaneous/MyChat';
import ChatBox from './miscellaneous/ChatBox';
import { ChatState } from '../../Context/ChatProvider';

function ChatComponent() {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChat fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
}

export default ChatComponent;
