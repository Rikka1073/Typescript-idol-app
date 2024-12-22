import { Box, Center, Input, Text } from "@chakra-ui/react";
import { PasswordInput } from "../ui/password-input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { User } from "@/domain/User";
import { createUser, getAllUsersData } from "@/utils/supabaseFunction";

type Inputs = {
  username: string;
  password: string;
};

const SignUp = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<User[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<Inputs>({ mode: "onChange" });
  const username = watch("username");
  const password = watch("password");

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const onClickSignUpButton = async () => {
    const userAcount = await getAllUsersData();
    if (userAcount) {
      const userExistsAcount = userAcount.some((user) => user.username === username);
      if (userExistsAcount) {
        alert("すでに登録されているユーザー名です");
      } else {
        const newUserData: User = {
          username: username,
          password: password,
        };
        const newUserDatas = [...userData, newUserData];
        setUserData(newUserDatas);
        createUser(username, password);
        navigate("/Clothes");
      }
    }
  };

  const onClickBackButton = () => {
    navigate("/");
  };

  return (
    <Box
      px={{ base: "20px", sm: "100px", md: "160px", lg: "200px" }}
      bg="white"
      h="vh"
      position="relative"
    >
      <Box pt={20}>
        <Text color="red.300" fontSize="4xl" textAlign="center" mb={20}>
          SIgn Up
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mb={10}>
            <Input
              {...register("username", { required: true })}
              value={username}
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
              value={password}
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
          </Box>
          <Center>
            <Button
              onClick={onClickSignUpButton}
              disabled={!isValid}
              w={200}
              variant="subtle"
              bg="red.300"
              color="white"
              mb={5}
              borderRadius="999px"
            >
              Sign Up
            </Button>
          </Center>
          <Center>
            <Button
              onClick={onClickBackButton}
              w={200}
              variant="outline"
              bg="white"
              color="red.300"
              borderRadius="999px"
              borderColor="red.300"
            >
              Back
            </Button>
          </Center>
        </form>
      </Box>
    </Box>
  );
};

export default SignUp;
