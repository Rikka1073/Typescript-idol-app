import { Box, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box
      position="fixed"
      top={0}
      w="100%"
      bg="white"
      shadow="sm"
      left="0"
      textAlign="center"
      h="50px"
    >
      <Box>
        <Text>Header</Text>
      </Box>
    </Box>
  );
};

export default Header;
