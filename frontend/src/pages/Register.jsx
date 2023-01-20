import {
  Box,
  Button,
  Card,
  CardBody,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link as ReachLink } from "react-router-dom";
import { InputNormal, InputPassword } from "../components/molecules/Input";

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
        w={"100vw"}
        h={"100vh"}
        bg={"teal.300"}
        display={"grid"}
        placeItems={"center"}
        px={{ base: "5", md: "0" }}
      >
        <Card w={"100%"} maxW={"md"}>
          <CardBody>
            <Text
              color={"teal.500"}
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight={{ base: "semibold" }}
            >
              Register
            </Text>
            <form onSubmit={handleSubmit}>
              <VStack spacing={{ base: 6, md: 8 }}>
                <VStack w={"100%"} spacing={0}>
                  <InputNormal
                    type="text"
                    variant="flushed"
                    placeholder="Name"
                    color={"teal.400"}
                    inputRef={nameRef}
                    fontSize={{ base: "md", md: "lg" }}
                  />
                  <InputNormal
                    type="email"
                    variant="flushed"
                    placeholder="Email"
                    color={"teal.400"}
                    inputRef={emailRef}
                    fontSize={{ base: "md", md: "lg" }}
                  />
                  <InputPassword
                    variant="flushed"
                    placeholder="Password"
                    color={"teal.400"}
                    inputRef={passwordRef}
                    fontSize={{ base: "md", md: "lg" }}
                  />
                  <InputPassword
                    variant="flushed"
                    placeholder="Password Confirmation"
                    color={"teal.400"}
                    inputRef={passwordConfirmationRef}
                    fontSize={{ base: "md", md: "lg" }}
                  />
                </VStack>
                <VStack w={"100%"} spacing={2} align="start">
                  <Button
                    type="submit"
                    size={{ base: "sm", md: "md" }}
                    w={"100%"}
                    colorScheme={"teal"}
                  >
                    Submit
                  </Button>
                  <Text fontSize={{ base: "xs", md: "md" }}>
                    Already have an account?{" "}
                    <Link
                      as={ReachLink}
                      to={"/login"}
                      color={"teal.400"}
                      fontWeight={500}
                    >
                      Login
                    </Link>
                  </Text>
                </VStack>
              </VStack>
            </form>
          </CardBody>
        </Card>
      </Box>
    </>
  );
}
