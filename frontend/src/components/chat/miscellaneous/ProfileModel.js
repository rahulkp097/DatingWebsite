import React from 'react'
import { Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { useSelector } from 'react-redux';
import { ViewIcon } from '@chakra-ui/icons';


const ProfileModel = ({children}) => {
    const { userInfo } = useSelector((state) => state.auth);

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
         

<Modal  isOpen={isOpen} onClose={onClose} size="md">
  <ModalOverlay />
  <ModalContent>
    <ModalHeader
    fontSize='40px'
    fontFamily='work sans'
    display='flex'
    justifyContent='center'
    >{userInfo?.name}</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
    <Image borderRadius="full"
    boxSize="150px"
    src={userInfo?.image}
    alt={userInfo?.name}/>
    <Text
    fontSize={{base:"28px",md:"30px"}}
    fontFamily="work sans"
    />
    </ModalBody>

    <ModalFooter>
      <Button colorScheme='blue' mr={3} onClick={onClose}>
        Close
      </Button>
      <Button variant='ghost'>Secondary Action</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
    </>
  )
}

export default ProfileModel