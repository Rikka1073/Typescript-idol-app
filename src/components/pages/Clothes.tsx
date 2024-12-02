import { Box, Image, Link, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Menu from "../Templetes/Menu";
import { fetchImages } from "@/utils/supabaseFunction";

const Clothes = () => {
  const [images, setImages] = useState<string[] | undefined>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetchImages()
      .then((urls) => {
        setImages(urls);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  }, []);

  if (error)
    return (
      <Text color="red.500" fontWeight="bold" textAlign="center">
        データが取得できません
      </Text>
    );

  return (
    <Box>
      <Box position="fixed" top={0} w="100%" bg="yellow.100" left="0" textAlign="center" h="50px">
        <Box>
          <Text>Header</Text>
        </Box>
      </Box>
      <Box
        bg="white"
        px={5}
        display="flex"
        flexWrap="wrap"
        rowGap={8}
        gap={8}
        justifyContent="space-between"
        mt="65px"
        overflow="scroll"
        h="calc(100vh - 50px)"
      >
        {!images || images.length === 0 ? (
          <Box display="flex" alignItems="center" justifyContent="center" h="100vh" w="full">
            <Box textAlign="center">
              <Spinner color="purple.400" />
              <Text color="purple.400" textAlign="center" mt={2}>
                Loading...
              </Text>
            </Box>
          </Box>
        ) : (
          images.map((image, index) => (
            <Box key={index} bg="purple.100" w="45%" h="30%" rounded="xl">
              <Image src={image} alt="clothes" w="80%" margin="auto" />
            </Box>
          ))
        )}
        <Menu />
      </Box>
    </Box>
  );
};

export default Clothes;
