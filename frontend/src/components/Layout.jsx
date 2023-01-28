import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Show,
  useDisclosure,
} from '@chakra-ui/react';
import Header from './organisms/Header';
import Sidebar from './organisms/Sidebar';

export default function Layout({ user, children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH={'100vh'} bg={'gray.100'}>
      <Sidebar display={{ base: 'none', md: 'block' }} />
      <Show below='md'>
        <Drawer isOpen={isOpen} onClose={onClose} placement='left' size='sm'>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
              <Sidebar />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Show>
      <Header user={user} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p={5}>
        {children}
      </Box>
    </Box>
  );
}
