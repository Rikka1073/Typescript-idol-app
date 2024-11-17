import { Box, Center, Text } from "@chakra-ui/react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();

  const onClickLoginButton = async () => {
    navigate("/Login");
  };

  const onClickSignUpButton = () => {
    navigate("/SignUp");
  };

  return (
    <>
      <Box
        px={10}
        bg="red.300"
        h="vh"
        bgGradient="to-t"
        gradientFrom="red.200"
        gradientTo="red.400"
      >
        <Box pt={20}>
          <Text color="white" fontSize="4xl" textAlign="center" mb={20}>
            Welcom
          </Text>
          <Center mb={5}>
            <Button
              onClick={onClickLoginButton}
              w={200}
              variant="outline"
              bg="white"
              color="red.300"
              borderRadius="999px"
              borderColor="red.300"
            >
              Login
            </Button>
          </Center>
          <Center>
            <Button
              onClick={onClickSignUpButton}
              w={200}
              variant="outline"
              bg="red.300"
              color="white"
              borderRadius="999px"
              borderColor="white"
            >
              Sign Up
            </Button>
          </Center>
        </Box>
      </Box>
    </>
  );
};

export default Home;
