import { Box, Center, Input, Text } from "@chakra-ui/react";
import { PasswordInput } from "../ui/password-input";
import { Button } from "../ui/button";

const Login = () => {
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
          <Center>
            <Button w={200} variant="subtle">
              Login
            </Button>
          </Center>
        </Box>
      </Box>
    </>
  );
};

export default Login;
