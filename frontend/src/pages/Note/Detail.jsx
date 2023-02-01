import { Button, Card, CardBody, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FiChevronLeft } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../axios';
import Layout from '../../components/Layout';

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token.token);
  const user = useSelector((state) => state.user.user);
  const [note, setNote] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchNote = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: `/notes/${id}`,
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      });
      setNote(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNote();
  }, []);

  return (
    <>
      <Helmet>
        <title>Note Detail</title>
      </Helmet>
      <Layout user={user}>
        <Button
          variant={'outline'}
          colorScheme={'teal'}
          onClick={() => navigate(-1)}
          leftIcon={<FiChevronLeft />}
        >
          Back
        </Button>
        <Card>
          <CardBody>
            <Text>{note.title}</Text>
          </CardBody>
        </Card>
      </Layout>
    </>
  );
}
