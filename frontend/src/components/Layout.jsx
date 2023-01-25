import { Box, Button, useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../redux/features/tokenSlice";
import { clearUser } from "../redux/features/userSlice";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const handleLogout = () => {
    dispatch(clearUser());
    dispatch(clearToken());
    toast({
      description: "User logged out successfully",
      status: "success",
      duration: 2000,
    });
    navigate("/login");
  };

  return (
    <Box minH={"100vh"} bg={"gray.100"}>
      <Button onClick={handleLogout}>Logout</Button>
      {children}
    </Box>
  );
}
