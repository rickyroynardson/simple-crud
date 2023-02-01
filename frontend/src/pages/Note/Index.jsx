import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormLabel,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spinner,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import axios from '../../axios';
import Layout from '../../components/Layout';
import { InputNormal, InputTextarea } from '../../components/molecules/Input';

export default function Index() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notes, setNotes] = useState([]);
  const [errors, setErrors] = useState({});
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.token.token);
  const titleRef = useRef();
  const bodyRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios({
        method: 'post',
        url: '/notes',
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
        data: {
          user_id: user.id,
          title: titleRef.current.value,
          body: bodyRef.current.value,
        },
      });
      setIsSubmitting(false);
      setErrors({});
      toast({
        description: response.data.message,
        status: 'success',
        duration: 2000,
      });
      titleRef.current.value = '';
      bodyRef.current.value = '';
      fetchNotes();
      onClose();
    } catch (error) {
      setIsSubmitting(false);
      setErrors(error.response.data.errors);
      toast({
        description: error.response.data.message,
        status: 'error',
        duration: 2000,
      });
    }
  };

  const fetchNotes = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: '/notes',
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      });
      setNotes(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <Helmet>
        <title>Note</title>
      </Helmet>
      <Layout user={user}>
        <Flex alignItems={'center'} justifyContent={'space-between'}>
          <Text fontWeight={'semibold'} fontSize={{ md: '4xl' }}>
            Note
          </Text>
          <Button
            size={'md'}
            variant={'outline'}
            colorScheme={'teal'}
            onClick={onOpen}
          >
            Add Note
          </Button>
        </Flex>
        {isLoading && (
          <Box>
            <Spinner />
          </Box>
        )}
        <SimpleGrid gap={4} columns={{ md: 3 }}>
          {notes.map((note) => (
            <Link
              as={NavLink}
              to={`/note/${note.id}`}
              key={note.id}
              style={{ textDecoration: 'none' }}
            >
              <Card w='full' h='full' _hover={{ bg: 'gray.100' }}>
                <CardBody>
                  <Text fontSize={{ md: 'xl' }} fontWeight='semibold'>
                    {note.title}
                  </Text>
                  <Text noOfLines={3}>{note.body}</Text>
                </CardBody>
              </Card>
            </Link>
          ))}
        </SimpleGrid>

        {/* Add Note Modal */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Note</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <InputNormal
                  type='text'
                  label='Title'
                  color={'teal.400'}
                  inputRef={titleRef}
                  isError={errors.title}
                  errorText={errors.title}
                />
                <InputTextarea
                  label='Body'
                  color={'teal.400'}
                  inputRef={bodyRef}
                  isError={errors.body}
                  errorText={errors.body}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  isLoading={isSubmitting}
                  type='submit'
                  size={{ base: 'sm', md: 'md' }}
                  colorScheme={'teal'}
                >
                  Submit
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </Layout>
    </>
  );
}
