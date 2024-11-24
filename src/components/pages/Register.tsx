import { Box, Center, Stack, Text } from "@chakra-ui/react";
import { FileUploadRoot, FileUploadTrigger } from "../ui/file-button";
import { Button } from "../ui/button";

import { IoIosAddCircle, IoIosHome, IoIosSearch } from "react-icons/io";
import { HiUpload } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const onclickHome = () => {
    navigate("/Clothes");
  };
  return (
    <>
      <Box
        position="relative"
        bgGradient="to-tl"
        gradientTo="red.300"
        gradientVia="pink.200"
        gradientFrom="purple.200"
        h="vh"
        color="white"
        px={5}
      >
        <Box pt={10}>
          <Text color="black" fontSize="3xl" mb={2}>
            服を探す
          </Text>
          <Text color="black" fontSize="base" mb={4}>
            探したいアイドルの服を登録しよう！
          </Text>
          <Box bg="white" p={5} rounded="md">
            <Stack gap={5}>
              <FileUploadRoot w="40%">
                <FileUploadTrigger asChild>
                  <Button variant="outline" size="sm" w="100%">
                    <HiUpload /> Upload file
                  </Button>
                </FileUploadTrigger>
              </FileUploadRoot>
              <Box>
                <img src="" />
              </Box>
              <Button size="sm" bg="#f9a8d4" w="100%" fontWeight="bold">
                送信
              </Button>
            </Stack>
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          position="fixed"
          bottom="0"
          left="0"
          width="100%"
          py={4}
          px={10}
          bg="white"
        >
          <Text color="#f9a8d4" onClick={onclickHome}>
            <Center>
              <IoIosHome size="35px" color="#f9a8d4" />
            </Center>
            Home
          </Text>
          <Text color="#f9a8d4">
            <Center>
              <IoIosAddCircle size="35px" color="#f9a8d4" />
            </Center>
            Add
          </Text>
          <Text color="#f9a8d4">
            <Center>
              <IoIosSearch size="35px" color="#f9a8d4" />
            </Center>
            Search
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default Register;
