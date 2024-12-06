import { Box, Image, Link, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Menu from "../Templetes/Menu";
import { fetchImages } from "@/utils/supabaseFunction";
import Header from "../Templetes/Header";

type ImageType = {
  file_name: string;
  file_url: string;
  id: string;
};

const Clothes = () => {
  const [images, setImages] = useState<ImageType[] | undefined>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchImages()
      .then((data) => {
        setImages(data);
        console.log(data);
      })
      .catch((error) => {
        setError(error);
        console.error(error);
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
      <Header />
      <Box
        bg="white"
        px={5}
        display="flex"
        flexWrap="wrap"
        columnGap={8}
        rowGap={4}
        justifyContent="space-between"
        mt="65px"
        overflow="scroll"
        h="calc(100vh - 100px)"
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
            <Box key={index} bg="purple.100" w="45%" h="200px" rounded="xl">
              <Link href={`/Clothes/${image.id}`} display="block" w="100%" h="100%">
                <Image src={image.file_url} alt="clothes" w="80%" margin="auto" py={4} />
                <Text textAlign="center">{image.id}</Text>
              </Link>
            </Box>
          ))
        )}
        <Menu />
      </Box>
    </Box>
  );
};

export default Clothes;
