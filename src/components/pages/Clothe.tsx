import { Box, Image, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Menu from "../Templetes/Menu";
import { useParams } from "react-router-dom";
import { supabase } from "@/utils/supabase";
import Header from "../Templetes/Header";

type ImageType = {
  file_name: string;
  file_url: string;
  id: string;
};

const Clothe = () => {
  const [images, setImages] = useState<ImageType | undefined>(undefined);
  const [answer, setAnswer] = useState<string | null>(false);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const getSelectImage = async () => {
        try {
          const { data } = await supabase.from("clothes").select("*").eq("id", id).single();
          setImages(data);
          console.log(data);
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      };
      getSelectImage();
    }
  }, [id]);

  return (
    <Box>
      <Header />
      <Text>{id}のページです</Text>
      <Box bg="white" px={5} mt="65px">
        {!images ? (
          <Box display="flex" alignItems="center" justifyContent="center" h="100vh" w="full">
            <Box textAlign="center">
              <Spinner color="purple.400" />
              <Text color="purple.400" textAlign="center" mt={2}>
                Loading...
              </Text>
            </Box>
          </Box>
        ) : (
          <Box mb={5}>
            <Image src={`${images.file_url}`} alt="clothes" w="100%" margin="auto" />
          </Box>
        )}
        {!answer ? (
          <Box
            bg="purple.100"
            w="100%"
            h="200px"
            rounded="xl"
            py={5}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text color="black" textAlign="center" mt={2} fontWeight="bold">
              回答がありません！
            </Text>
          </Box>
        ) : (
          <div>a</div>
        )}
        <Menu pageId={id} />
      </Box>
    </Box>
  );
};

export default Clothe;
