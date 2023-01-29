import { Link } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

export default function LinkItem({ to, icon, label }) {
  return (
    <Link
      as={NavLink}
      to={to}
      display='flex'
      alignItems='center'
      gap={2}
      py={2}
      px={4}
      borderRadius={'xl'}
      style={{ textDecoration: 'none' }}
      _hover={{ bg: 'gray.100' }}
      _activeLink={{ color: 'white', bg: 'teal.400' }}
    >
      {icon}
      {label}
    </Link>
  );
}
