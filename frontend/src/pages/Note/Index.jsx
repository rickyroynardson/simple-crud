import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import Layout from '../../components/Layout';

export default function Index() {
  const user = useSelector((state) => state.user.user);

  return (
    <>
      <Helmet>
        <title>Note</title>
      </Helmet>
      <Layout user={user}>note index</Layout>
    </>
  );
}
