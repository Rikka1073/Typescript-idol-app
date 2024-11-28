import { supabase } from "@/utils/supabase";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Clothes = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase.storage.from("pictures").list("Clothes");
      if (data) {
        console.log(data);
        const urls = await Promise.all(
          data.map(async (image) => {
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
    <Box>
      {images.length === 0 ? (
        <Box display="flex" alignItems="center" justifyContent="center" h="100vh">
          <Box textAlign="center">
            <Spinner color="purple.400" />
            <Text color="purple.400" textAlign="center" mt={2}>
              Loading...
            </Text>
          </Box>
        </Box>
      ) : (
        images.map((image, index) => <img key={index} src={image} alt="clothes" />)
      )}
    </Box>
  );
};

export default Clothes;
