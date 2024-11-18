import { Box, Center, Input, Stack, Text } from "@chakra-ui/react";
import { IoIosAddCircle, IoIosHome, IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const onclickHome = () => {
    navigate("/Clothes");
  };
  return (
    <>
      <Box position="relative" bg="black" h="vh" color="white" px={10}>
        <Box>
          <Box>
            <Text>服を探す</Text>
            <Stack gap={5}>
              <Input placeholder="服を探す" />
              <Input placeholder="服を探す" />
              <Input placeholder="服を探す" type="file" />
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
