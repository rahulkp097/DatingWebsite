
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import ChatComponent from '../../components/chat/ChatComponent';
import ChatProvider from '../../Context/ChatProvider';

function Chatscreen() {
  
  return (
    <ChakraProvider>
       <ChatProvider>
      <ChatComponent />
      </ChatProvider>
    </ChakraProvider>
  );
}

export default Chatscreen;
