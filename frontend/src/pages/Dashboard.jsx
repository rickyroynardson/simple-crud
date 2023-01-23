import { Box } from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';

export default function Dashboard() {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Box>dashboard</Box>
    </>
  );
}
