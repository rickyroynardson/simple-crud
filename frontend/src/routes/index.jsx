import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const Dashboard = lazy(() => import('../pages/Dashboard'));

export default createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
    ],
  },
]);
