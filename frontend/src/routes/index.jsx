import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
const Guest = lazy(() => import("../components/Guest"));
const Authed = lazy(() => import("../components/Authed"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Dashboard = lazy(() => import("../pages/Dashboard"));

export default createBrowserRouter([
  {
    path: "/",
    children: [
      {
        element: <Guest />,
        children: [
          {
            index: true,
            element: <Login />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
        ],
      },
      {
        element: <Authed />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);
