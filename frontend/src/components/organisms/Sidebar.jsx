import { background, Box, Link, Text, VStack } from '@chakra-ui/react';
import { FiFile, FiHome } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { LinkItem } from '../molecules/Sidebar';

export default function Sidebar({ display }) {
  return (
    <Box
      display={display}
      w={{ base: 'xs', md: 60 }}
      h='full'
      pos='fixed'
      bg='white'
      px={{ md: 3 }}
      py={{ md: 5 }}
      borderRight={{ base: 'none', md: '1px' }}
      borderRightColor={{ md: 'teal.300' }}
    >
      <Link as={NavLink} to='/dashboard' style={{ textDecoration: 'none' }}>
        <Text
          fontSize={{ base: '2xl', md: '3xl' }}
          textAlign={{ md: 'center' }}
          fontWeight={{ md: 'semibold' }}
          color='teal.500'
        >
          Simple CRUD
        </Text>
      </Link>
      <VStack align='stretch'>
        <LinkItem to='/dashboard' icon={<FiHome />} label='Dashboard' />
        <LinkItem to='/note' icon={<FiFile />} label='Note' />
      </VStack>
    </Box>
  );
}
