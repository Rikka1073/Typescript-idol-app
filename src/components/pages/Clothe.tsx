import { Box, Image, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Menu from "../Templetes/Menu";
import { useParams } from "react-router-dom";
import { supabase } from "@/utils/supabase";

type ImageType = {
  file_name: string;
  file_url: string;
  id: string;
};

const Clothe = () => {
  const [images, setImages] = useState<ImageType[] | undefined>([]);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const getSelectImage = async () => {
        try {
          const { data } = await supabase.from("clothes").select("*").eq("id", id).single();
          setImages(data);
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      };
      getSelectImage();
    }
  }, [id]);

  return (
    <Box>
      <Text>{id}のページです</Text>

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
          <Box bg="purple.100" w="45%" h="30%" rounded="xl">
            <Image src={`${images.file_url}`} alt="clothes" w="80%" margin="auto" />
          </Box>
        )}
        <Menu />
      </Box>
    </Box>
  );
};

export default Clothe;
