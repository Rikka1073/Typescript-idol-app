import { Box, Center, Input, Text } from "@chakra-ui/react";
import { PasswordInput } from "../ui/password-input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { User } from "@/domain/User";
import { createUser } from "@/utils/supabaseFunction";

type Inputs = {
  username: string;
  password: string;
};

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState<User[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>({ mode: "onChange" });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onClickSignUpButton = () => {
    const newUserData: User = {
      username: username,
      password: password,
    };
    const newUserDatas = [...userData, newUserData];
    setUserData(newUserDatas);
    console.log("クリックしました");
    createUser(username, password);
    navigate("/Clothes");
  };

  const onClickBackButton = () => {
    navigate("/");
  };

  return (
    <Box px={10} bg="white" h="vh" position="relative">
      <Box pt={20}>
        <Text color="red.300" fontSize="4xl" textAlign="center" mb={20}>
          SIgn Up
        </Text>
        <Box mb={10}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("username", { required: true, onChange: handleChange })}
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
              {...register("password", { required: true, onChange: handleChange })}
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
      </Box>
    </Box>
  );
};

export default SignUp;
