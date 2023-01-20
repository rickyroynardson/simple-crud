import { Box, Spinner } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";

export default function Loading() {
  return (
    <>
      <Helmet>
        <title>Loading</title>
      </Helmet>
      <Box
        w={"100vw"}
        h={"100vh"}
        bg={"teal.300"}
        display={"grid"}
        placeItems={"center"}
      >
        <Spinner size="xl" thickness="5px" color="white" speed="0.65s" />
      </Box>
    </>
  );
}
