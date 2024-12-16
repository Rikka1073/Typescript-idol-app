import { Box, Image, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Menu from "../Templetes/Menu";
import { useParams } from "react-router-dom";
import { supabase } from "@/utils/supabase";
import Header from "../Templetes/Header";
import { getAnswer } from "@/utils/supabaseFunction";
import { AnswerData } from "@/domain/AnswerData";

type ImageType = {
  file_name: string;
  file_url: string;
  id: string;
};

const Clothe = () => {
  const [images, setImages] = useState<ImageType | null>(null);
  const [answer, setAnswer] = useState<AnswerData[] | null>(null);

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

  useEffect(() => {
    const getSelectAnswer = async () => {
      try {
        const data = await getAnswer();
        const matchAnswer = data?.filter((item) => item.pramsId === id);
        setAnswer(matchAnswer || []);
        console.log("matchAnswer", matchAnswer);
      } catch (error) {
        console.error("Error fetching answer:", error);
      }
    };
    getSelectAnswer();
  }, []);

  return (
    <Box>
      <Header />
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
        {answer && answer.length > 0 ? (
          <>
            <Box mb={5}>
              {answer.map((item, index) => {
                return (
                  <Box key={index}>
                    <Text>{item.text}</Text>
                    <Text>{item.idol}</Text>
                    <Text>{item.link}</Text>
                  </Box>
                );
              })}
            </Box>
            <Text>{id}のページが表示されます</Text>
          </>
        ) : (
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
        )}
        <Menu pageId={id} />
      </Box>
    </Box>
  );
};

export default Clothe;
