import { Box, Text } from '@chakra-ui/react';
import axios from '../axios';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../redux/features/tokenSlice';
import Layout from '../components/Layout';

export default function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.token.token);

  const handleExample = () => {
    console.log('akses token yg dipake;', token.access);
    axios({
      method: 'get',
      url: '/example',
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRefresh = () => {
    console.log('refresh token yg dipake: ', token.refresh);
    axios({
      method: 'get',
      url: '/refresh',
      headers: {
        refresh_token: token.refresh,
      },
    })
      .then((res) => {
        console.log(res.data.access_token);
        dispatch(setToken({ ...token, access: res.data.access_token }));
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Layout user={user}>
        <Text fontSize={{ md: '3xl' }}>Welcome, {user.name}</Text>
      </Layout>
    </>
  );
}
