import {
  Box,
  Button,
  Card,
  CardBody,
  Link,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { Link as ReachLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axios from '../axios';
import { InputNormal, InputPassword } from '../components/molecules/Input';
import { useRef, useState } from 'react';

export default function Login() {
  const navigate = useNavigate();
  const toast = useToast();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      axios({
        method: 'post',
        url: '/login',
        data: {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        },
      })
        .then((res) => {
          setIsLoading(false);
          setErrors({});
          toast({
            description: res.data.message,
            status: 'success',
            duration: 2000,
          });
          console.log(res.data.access_token);
          navigate('/dashboard');
        })
        .catch((error) => {
          setIsLoading(false);
          setErrors(error.response.data.errors);
          toast({
            description: error.response.data.message,
            status: 'error',
            duration: 2000,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Box
        w={'100vw'}
        h={'100vh'}
        bg={'teal.300'}
        display={'grid'}
        placeItems={'center'}
        px={{ base: '5', md: '0' }}
      >
        <Card w={'100%'} maxW={'md'}>
          <CardBody>
            <Text
              color={'teal.500'}
              fontSize={{ base: 'xl', md: '2xl' }}
              fontWeight={{ base: 'semibold' }}
            >
              Login
            </Text>
            <form onSubmit={handleSubmit}>
              <VStack spacing={{ base: 6, md: 8 }}>
                <VStack w={'100%'} spacing={0}>
                  <InputNormal
                    type='email'
                    variant='flushed'
                    placeholder='Email'
                    color={'teal.400'}
                    inputRef={emailRef}
                    fontSize={{ base: 'md', md: 'lg' }}
                    isError={errors.email}
                    errorText={errors.email}
                  />
                  <InputPassword
                    variant='flushed'
                    placeholder='Password'
                    color={'teal.400'}
                    inputRef={passwordRef}
                    fontSize={{ base: 'md', md: 'lg' }}
                    isError={errors.password}
                    errorText={errors.password}
                  />
                </VStack>
                <VStack w={'100%'} spacing={2} align='start'>
                  <Button
                    isLoading={isLoading}
                    type='submit'
                    size={{ base: 'sm', md: 'md' }}
                    w={'100%'}
                    colorScheme={'teal'}
                  >
                    Login
                  </Button>
                  <Text fontSize={{ base: 'xs', md: 'md' }}>
                    Don't have an account?{' '}
                    <Link
                      as={ReachLink}
                      to={'/register'}
                      color={'teal.400'}
                      fontWeight={500}
                    >
                      Register
                    </Link>
                  </Text>
                </VStack>
              </VStack>
            </form>
          </CardBody>
        </Card>
      </Box>
    </>
  );
}
