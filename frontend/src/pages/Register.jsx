import { Box, Button, Card, CardBody, Text } from '@chakra-ui/react';
import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { InputNormal, InputPassword } from '../components/molecules/Input';

export default function Register() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
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
              fontSize={{ base: 'xl' }}
              fontWeight={{ base: 'semibold' }}
            >
              Register
            </Text>
            <form onSubmit={handleSubmit}>
              <InputNormal
                type='text'
                variant='flushed'
                placeholder='Name'
                color={'teal.400'}
                inputRef={nameRef}
              />
              <InputNormal
                type='email'
                variant='flushed'
                placeholder='Email'
                color={'teal.400'}
                inputRef={emailRef}
              />
              <InputPassword
                variant='flushed'
                placeholder='Password'
                color={'teal.400'}
                inputRef={passwordRef}
              />
              <InputPassword
                variant='flushed'
                placeholder='Password Confirmation'
                color={'teal.400'}
                inputRef={passwordConfirmationRef}
              />
              <Button
                type='submit'
                size={{ base: 'sm' }}
                w={'100%'}
                colorScheme={'teal'}
              >
                Submit
              </Button>
            </form>
          </CardBody>
        </Card>
      </Box>
    </>
  );
}
