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
      <Header pageId={id} />
      <Box
        bg="red.200"
        pt={{ base: "90px", sm: "110px", md: "130px", lg: "150px" }}
        pb="106px"
        px={5}
        h={{ lg: "100vh" }}
      >
        <Box
          overflow={{
            base: "scroll",
            lg: "hidden",
          }}
          h={{
            base: "calc(100vh - 100px)",
            lg: "auto",
          }}
        >
          {!images ? (
            <Box display="flex" alignItems="center" justifyContent="center" h="100vh" w="full">
              <Box textAlign="center">
                <Spinner color="white" />
                <Text color="white" textAlign="center" mt={2}>
                  Loading...
                </Text>
              </Box>
            </Box>
          ) : (
            <Box
              width={{ base: "100%", sm: "70%", md: "30%" }}
              margin={{ base: "auto", md: "auto" }}
              mb={{ base: 5, md: "50px" }}
            >
              <Image src={`${images.file_url}`} alt="clothes" w="100%" margin="auto" rounded="xl" />
            </Box>
          )}
          {answer && answer.length > 0 ? (
            <>
              <Box mb={5}>
                {answer.map((item, index) => {
                  return (
                    <Box
                      key={index}
                      bg="white"
                      width={{ base: "100%", sm: "80%", md: "40%" }}
                      h="auto"
                      rounded="xl"
                      p={5}
                      margin={{ base: "auto", md: "auto" }}
                    >
                      <Text fontWeight="bold" mb="10px">
                        回答
                      </Text>
                      <Text>{item.text}</Text>
                      <Text>{item.idol}</Text>
                      <Text>{item.link}</Text>
                    </Box>
                  );
                })}
              </Box>
            </>
          ) : (
            <Box
              bg="white"
              width={{ base: "100%", sm: "80%", md: "40%" }}
              h="200px"
              rounded="xl"
              py={5}
              display="flex"
              alignItems="center"
              justifyContent="center"
              margin={{ base: "auto", md: "auto" }}
            >
              <Text color="black" textAlign="center" mt={2} fontWeight="bold">
                回答がありません！
              </Text>
            </Box>
          )}
          <Menu pageId={id} />
        </Box>
      </Box>
    </Box>
  );
};

export default Clothe;
