import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const auth = useSelector((state) => state.auth.auth);

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Box>welcome, {auth.user.name}</Box>
    </>
  );
}
