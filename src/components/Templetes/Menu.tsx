import { Box, Center, Text } from "@chakra-ui/react";
import { IoIosAddCircle, IoIosHome, IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();
  const onclickHome = () => {
    navigate("/Clothes");
  };

  const onclickAdd = () => {
    navigate("/Clothes/Register");
  };

  return (
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
      shadow="2xl"
      roundedTop="2xl"
      md={{ px: "40", py: "6", display: "none" }}
    >
      <Box onClick={onclickHome}>
        <Center>
          <IoIosHome size="30px" color="#f9a8d4" />
        </Center>
        <Center>
          <Text color="#f9a8d4">Home</Text>
        </Center>
      </Box>
      <Box onClick={onclickAdd}>
        <Center>
          <IoIosAddCircle size="30px" color="#f9a8d4" />
        </Center>
        <Center>
          <Text color="#f9a8d4">Add</Text>
        </Center>
      </Box>
      <Box onClick={onclickAdd}>
        <Center>
          <IoIosSearch size="30px" color="#f9a8d4" />
        </Center>
        <Center>
          <Text color="#f9a8d4">Search</Text>
        </Center>
      </Box>
    </Box>
  );
};

export default Menu;
