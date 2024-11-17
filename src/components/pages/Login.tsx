import { Box, Center, Input, Text } from "@chakra-ui/react";
import { PasswordInput } from "../ui/password-input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  username: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>({ mode: "onChange" });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const onClickLoginButton = async () => {
    // const userData = await getAllUsersData();
    // const userExists = userData.some((user) => user.username === username);
    // if (userExists) {
    //   navigate("/Clothes");
    // } else {
    //   alert("ユーザーが存在しません");
    // }
    navigate("/Clothes");
  };

  const onClickBackButton = () => {
    navigate("/");
  };

  return (
    <>
      <Box px={10} bg="red.300" h="vh" position="relative">
        <Box pt={20}>
          <Text color="white" fontSize="4xl" textAlign="center" mb={20}>
            Login
          </Text>
          <Box mb={10}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                {...register("username", { required: true })}
                placeholder="Username"
                variant="flushed"
                _placeholder={{ color: "white" }}
                mb={5}
              />
              {errors.username && (
                <Text color="black" mb={2}>
                  ユーザーネームの入力は必須です
                </Text>
              )}
              <PasswordInput
                {...register("password", { required: true })}
                placeholder="password"
                variant="flushed"
                _placeholder={{ color: "white" }}
              />
              {errors.password && (
                <Text color="black" mt={5}>
                  パスワードの入力は必須です
                </Text>
              )}
            </form>
          </Box>
          <Center mb={5}>
            <Button
              onClick={onClickLoginButton}
              disabled={!isValid}
              w={200}
              variant="subtle"
              borderRadius="999px"
            >
              Login
            </Button>
          </Center>
          <Center>
            <Button
              onClick={onClickBackButton}
              w={200}
              variant="outline"
              bg="red.300"
              color="white"
              borderRadius="999px"
              borderColor="white"
            >
              Back
            </Button>
          </Center>
        </Box>
      </Box>
    </>
  );
};

export default Login;
