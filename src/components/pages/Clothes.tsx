import { supabase } from "@/utils/supabase";
import { Box, Image, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Clothes = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase.storage.from("pictures").list("Clothes");
      if (data) {
        console.log(data);
        const filteredImages = data.filter((image) => image.name !== ".emptyFolderPlaceholder");
        const urls = await Promise.all(
          filteredImages.map(async (image) => {
            const { data } = supabase.storage
              .from("pictures")
              .getPublicUrl(`Clothes/${image.name}`);
            console.log(data.publicUrl);
            return data.publicUrl;
          })
        );
        setImages(urls);
      } else {
        console.error(error);
      }
    };
    fetchImages();
  }, []);

  return (
    <Box
      bg="white"
      px={5}
      display="flex"
      flexWrap="wrap"
      rowGap={8}
      gap={8}
      justifyContent="space-between"
    >
      {images.length === 0 ? (
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
          <Box bg="purple.100" w="45%" h="30%" rounded="xl">
            <Image key={index} src={image} alt="clothes" w="80%" margin="auto" />
          </Box>
        ))
      )}
    </Box>
  );
};

export default Clothes;
