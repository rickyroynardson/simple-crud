import {
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from '@chakra-ui/react';
import { FiChevronDown, FiMenu, FiUser } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearToken } from '../../redux/features/tokenSlice';
import { clearUser } from '../../redux/features/userSlice';

export default function Header({ user, onOpen }) {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
    dispatch(clearToken());
    toast({
      description: 'User logged out successfully',
      status: 'success',
      duration: 2000,
    });
    navigate('/login');
  };

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      h={16}
      px={4}
      bg='white'
      borderBottom='1px'
      borderBottomColor='teal.300'
      alignItems='center'
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
    >
      <IconButton
        onClick={onOpen}
        display={{ base: 'flex', md: 'none' }}
        variant='outline'
        aria-label='Open Menu'
        icon={<FiMenu />}
      />
      <Menu>
        <MenuButton>
          <HStack>
            <FiUser />
            <Text>{user.name}</Text>
            <FiChevronDown />
          </HStack>
        </MenuButton>
        <MenuList>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
