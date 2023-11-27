
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import ChatComponent from '../../components/chat/ChatComponent';
import ChatProvider from '../../Context/ChatProvider';
import Header from '../../components/user/Header'
import Footer from '../../components/user/Footer'
function Chatscreen() {
  
  return (
    <>
    <Header/>
    
    <ChakraProvider>
       <ChatProvider>
      <ChatComponent />
      </ChatProvider>
    </ChakraProvider>
      <Footer/>
    </>
  );
}

export default Chatscreen;
