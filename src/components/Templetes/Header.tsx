import { Box, Link } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

type MenuProps = {
  pageId: string | undefined;
};

const Header = ({ pageId }: MenuProps) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const onclickHome = () => {
    navigate("/Clothes");
  };

  const onclickAdd = () => {
    navigate("/Clothes/Register");
  };

  const onclickAnswer = () => {
    navigate(`/Clothes/Answer?id=${pageId}`);
  };

  return (
    <Box
      position="fixed"
      top={0}
      w="100%"
      bg="white"
      shadow="sm"
      left="0"
      textAlign="center"
      h={{ base: "50px", lg: "100px" }}
    >
      <Box
        h="100%"
        display={{ md: "flex", lg: "flex" }}
        alignItems="center"
        justifyContent={{ sm: "center", md: "space-between", lg: "space-between" }}
        color="black"
        gap="30px"
        px={{ base: "50px", md: "60px", lg: "80px" }}
      >
        <Box
          position={{ base: "absolute", sm: "absolute", md: "static", lg: "static" }}
          top={{ base: "50%", sm: "50%", md: "50%" }}
          left={{ base: "50%", sm: "50%", md: "50%" }}
          transform={{
            base: "translate(-50%, -50%)",
            sm: "translate(-50%, -50%)",
            md: "none",
            lg: "none",
          }}
        >
          <Link fontWeight="bold" fontSize={{ lg: "2xl" }} onClick={onclickHome} color="#f9a8d4">
            K-Style Finder
          </Link>
        </Box>
        <Box display={{ base: "none", sm: "none", md: "block", lg: "block" }} fontWeight="bold">
          <Box display="flex" justifyContent="left" w="100%" gap="40px" fontSize="xl">
            <Link colorPalette="pink" onClick={onclickHome} color="#f9a8d4">
              Home
            </Link>
            <Link onClick={onclickAdd} color="#f9a8d4">
              Add
            </Link>
            {id && <Link onClick={onclickAnswer}>Answer</Link>}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
