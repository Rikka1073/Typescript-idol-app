import { Box, Center, Input, Text } from "@chakra-ui/react";
import { PasswordInput } from "../ui/password-input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { getAllUsersData } from "../../utils/supabaseFunction";

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
    watch,
  } = useForm<Inputs>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    const userData = await getAllUsersData();
    const userExists = userData?.some(
      (user) => user.username === username && user.password === password
    );
    console.log("userExists:", userExists);
    if (userExists) {
      navigate("/Clothes");
      console.log("ログイン成功");
    } else {
      alert("ユーザーが存在しません");
    }
  };

  const username = watch("username");
  const password = watch("password");

  const onClickBackButton = () => {
    navigate("/");
  };

  return (
    <>
      <Box
        px={{ base: "20px", sm: "100px", md: "160px", lg: "200px" }}
        bg="red.300"
        h="vh"
        position="relative"
      >
        <Box pt={20}>
          <Text color="white" fontSize="4xl" textAlign="center" mb={20} data-testid="pageTitle">
            Login
          </Text>
          <form onSubmit={handleSubmit(onSubmit)} role="form">
            <Box mb={10}>
              <Input
                {...register("username", { required: true })}
                placeholder="userName"
                variant="flushed"
                _placeholder={{ color: "white" }}
                mb={5}
                data-testid="userName"
              />
              {errors.username && (
                <Text color="black" mb={2} data-testid="userNameError">
                  ユーザーネームの入力は必須です
                </Text>
              )}
              <PasswordInput
                {...register("password", { required: true })}
                placeholder="password"
                variant="flushed"
                _placeholder={{ color: "white" }}
                data-testid="password"
              />
              {errors.password && (
                <Text color="black" mt={5} data-testid="passwordError">
                  パスワードの入力は必須です
                </Text>
              )}
            </Box>
            <Center mb={5}>
              <Button
                // onClick={onClickLoginButton}
                disabled={!isValid}
                w={200}
                variant="subtle"
                borderRadius="999px"
                type="submit"
                data-testid="loginButton"
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
          </form>
        </Box>
      </Box>
    </>
  );
};

export default Login;
