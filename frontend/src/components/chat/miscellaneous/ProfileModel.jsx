import React from 'react'
import { Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { useSelector } from 'react-redux';
import { ViewIcon } from '@chakra-ui/icons';


const ProfileModel = ({ user, children }) => {
   

    const {isOpen, onOpen,onClose}=useDisclosure()
  return (
    <>
      {  children ? (
      <span onClick={onOpen}>{children}</span>
      ):(
        <IconButton 
        display={{base:"flex"}}
        icon={<ViewIcon/>}
        onClick={onOpen}        
        />
        )}
         
         <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            d="flex"
            justifyContent="center"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              borderRadius="full"
              boxSize="150px"
              src={user.image||
                "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"}
              alt={user.name}
            />
            <Text
              fontSize={{ base: "28px", md: "30px" }}
              fontFamily="Work sans"
            >
              Email: {user.email}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfileModel