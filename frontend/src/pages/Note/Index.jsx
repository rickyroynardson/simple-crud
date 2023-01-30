import {
  Box,
  Button,
  Card,
  CardBody,
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
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import axios from '../../axios';
import Layout from '../../components/Layout';

export default function Index() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.token.token);

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
  }, [notes]);

  return (
    <>
      <Helmet>
        <title>Note</title>
      </Helmet>
      <Layout user={user}>
        <Button onClick={onOpen}>Add Note</Button>
        {isLoading && (
          <Box>
            <Spinner />
          </Box>
        )}
        <SimpleGrid gap={4} columns={{ md: 3 }}>
          {notes.map((note) => (
            <Card key={note.id}>
              <CardBody>
                <Text fontSize={{ md: 'xl' }} fontWeight='semibold'>
                  {note.title}
                </Text>
                <Text noOfLines={3}>{note.body}</Text>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>

        {/* Add Note Modal */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Note</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Body</Text>
            </ModalBody>
            <ModalFooter>
              <Button>Submit</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Layout>
    </>
  );
}
