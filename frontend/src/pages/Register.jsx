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
import { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as ReachLink, useNavigate } from 'react-router-dom';
import axios from '../axios';
import { InputNormal, InputPassword } from '../components/molecules/Input';

export default function Register() {
  const navigate = useNavigate();
  const toast = useToast();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      axios({
        method: 'post',
        url: '/register',
        data: {
          name: nameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          password_confirmation: passwordConfirmationRef.current.value,
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
          navigate('/login');
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
        <title>Register</title>
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
              Register
            </Text>
            <form onSubmit={handleSubmit}>
              <VStack spacing={{ base: 6, md: 8 }}>
                <VStack w={'100%'} spacing={0}>
                  <InputNormal
                    type='text'
                    variant='flushed'
                    placeholder='Name'
                    color={'teal.400'}
                    inputRef={nameRef}
                    fontSize={{ base: 'md', md: 'lg' }}
                    isError={errors.name}
                    errorText={errors.name}
                  />
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
                  <InputPassword
                    variant='flushed'
                    placeholder='Password Confirmation'
                    color={'teal.400'}
                    inputRef={passwordConfirmationRef}
                    fontSize={{ base: 'md', md: 'lg' }}
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
                    Submit
                  </Button>
                  <Text fontSize={{ base: 'xs', md: 'md' }}>
                    Already have an account?{' '}
                    <Link
                      as={ReachLink}
                      to={'/login'}
                      color={'teal.400'}
                      fontWeight={500}
                    >
                      Login
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
