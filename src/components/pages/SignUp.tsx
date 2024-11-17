import { Box, Center, Input, Text } from "@chakra-ui/react";
import { PasswordInput } from "../ui/password-input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  username: string;
  password: string;
};

const SignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>({ mode: "onChange" });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const onClickSignUpButton = (data) => {
    console.log("クリックしました");
    console.log(data);
    navigate("/Clothes");
  };

  return (
    <Box px={10} bg="white" h="vh" position="relative">
      <Box pt={20}>
        <Text color="red.300" fontSize="3xl" textAlign="center" mb={20}>
          SIgn Up
        </Text>
        <Box mb={10}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("username", { required: true })}
              placeholder="Username"
              variant="flushed"
              _placeholder={{ color: "red.300" }}
              borderColor={"red.300"}
              _focus={{ borderBottom: "none" }}
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
              _placeholder={{ color: "red.300" }}
              borderColor={"red.300"}
              _focus={{ borderBottom: "none" }}
            />
            {errors.password && (
              <Text color="black" mt={5}>
                パスワードの入力は必須です
              </Text>
            )}
          </form>
        </Box>
        <Center>
          <Button
            onClick={onClickSignUpButton}
            disabled={!isValid}
            w={200}
            variant="subtle"
            bg="red.300"
            color="white"
          >
            Sign Up
          </Button>
        </Center>
      </Box>
    </Box>
  );
};

export default SignUp;
