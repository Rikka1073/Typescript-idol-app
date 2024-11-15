import { Box, Center, Input, Text } from "@chakra-ui/react";
import { PasswordInput } from "../ui/password-input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const onClickLoginButton = () => {
    console.log("クリックしました");
    navigate("/Clothes");
  };

  return (
    <>
      <Box px={10} bg="red.400" h="vh">
        <Box pt={20}>
          <Text color="white" fontSize="3xl" textAlign="center" mb={20}>
            Login
          </Text>
          <Box mb={10}>
            <form>
              <Input
                placeholder="Username"
                variant="flushed"
                _placeholder={{ color: "white" }}
                mb={5}
              />
              <PasswordInput
                placeholder="password"
                variant="flushed"
                _placeholder={{ color: "white" }}
              />
            </form>
          </Box>
          <Center mb={5}>
            <Button w={200} variant="subtle" onClick={onClickLoginButton}>
              Login
            </Button>
          </Center>
          <Center>
            <Button w={200} variant="subtle">
              Sign Up
            </Button>
          </Center>
        </Box>
      </Box>
    </>
  );
};

export default Login;
