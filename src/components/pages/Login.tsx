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
  } = useForm<Inputs>({ mode: "onChange" });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const username = watch("username");
  const password = watch("password");

  const onClickLoginButton = async () => {
    const userData = await getAllUsersData();
    const userExists = userData?.some(
      (user) => user.username === username && user.password === password
    );
    if (userExists) {
      navigate("/Clothes");
      console.log("ログイン成功");
    } else {
      alert("ユーザーが存在しません");
    }
  };

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box mb={10}>
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
            </Box>
            <Center mb={5}>
              <Button
                onClick={onClickLoginButton}
                disabled={!isValid}
                w={200}
                variant="subtle"
                borderRadius="999px"
                type="submit"
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
