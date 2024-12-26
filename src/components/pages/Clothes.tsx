import { Box, Image, Link, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Menu from "../Templetes/Menu";
import Header from "../Templetes/Header";
import { fetchImages } from "../../utils/supabaseFunction";

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
      <Header pageId={undefined} />
      <Box
        bg="red.200"
        px={{ base: "20px", sm: "40px", md: "60px", lg: "80px" }}
        columnGap={8}
        rowGap={4}
        pt={{ base: "90px", sm: "110px", md: "130px", lg: "150px" }}
        pb="106px"
      >
        <Box
          overflow="scroll"
          h={{
            base: "calc(100vh - 100px)",
            md: "calc(100vh - 100px)",
          }}
          display="flex"
          flexWrap="wrap"
          gap="20px"
          scrollbar="hidden"
          justifyContent="space-between"
        >
          {!images || images.length === 0 ? (
            <Box display="flex" alignItems="center" justifyContent="center" h="100vh" w="full">
              <Box textAlign="center">
                <Spinner color="white" />
                <Text color="white" textAlign="center" mt={2}>
                  Loading...
                </Text>
              </Box>
            </Box>
          ) : (
            images.map((image, index) => (
              <Box
                key={index}
                bg="white"
                w={{ base: "45%", sm: "30%", md: "20%" }}
                h={{ base: "30%", sm: "40%", md: "35%", lg: "45%" }}
                rounded="xl"
                shadow="md"
              >
                <Link href={`/Clothes/${image.id}`} display="block" w="100%" h="100%">
                  <Image src={image.file_url} alt="clothes" w="80%" margin="auto" py={4} />
                  <Text textAlign="center">{image.id}</Text>
                </Link>
              </Box>
            ))
          )}
          <Menu pageId={undefined} />
        </Box>
      </Box>
    </Box>
  );
};

export default Clothes;
