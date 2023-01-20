import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import Loading from './components/Loading';
import routes from './routes';

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={routes} />
    </Suspense>
  );
}

export default App;
