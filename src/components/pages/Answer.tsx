import { Box, Input, Stack, Text } from "@chakra-ui/react";
import Menu from "../Templetes/Menu";
import Header from "../Templetes/Header";
import { Button } from "../ui/button";
import { Field } from "../ui/field";
import { useForm } from "react-hook-form";
import { AnswerData } from "@/domain/AnswerData";
import { useState } from "react";
import { addAnswer } from "@/utils/supabaseFunction";
import { useLocation, useNavigate } from "react-router-dom";

type Inputs = {
  link: string;
  idol: string;
  text: string;
  pramsId: string;
};

const Answer = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Inputs[]>([]);
  const methods = useForm<Inputs>();
  const { handleSubmit, register } = methods;
  const onsubmit = handleSubmit((data) => {
    const newAnswer: AnswerData = {
      link: data.link,
      idol: data.idol,
      text: data.text,
      pramsId: data.pramsId,
    };
    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);
    addAnswer(data.link, data.idol, data.text, data.pramsId);
    navigate("/Clothes");
  });

  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const paramsId = query.get("id");
  const valueId = paramsId ? paramsId : "";

  return (
    <Box
      pt={{ base: "90px", sm: "110px", md: "130px", lg: "150px" }}
      px={{ base: "20px", sm: "40px", md: "60px", lg: "80px" }}
      bg="red.200"
      h="vh"
    >
      <Box md={{ width: "50%", m: "auto" }}>
        <Header pageId={undefined} />
        <Text color="black" fontSize="2xl" mb={2}>
          回答する
        </Text>
        <Text color="black" fontSize="base" mb={4}>
          服の情報を教えてあげましょう
        </Text>
        <Box bg="white" py={5} px={2} rounded="md">
          <form onSubmit={onsubmit}>
            <Stack gap={5}>
              <Field label="リンク" required>
                <Input {...register("link")} />
              </Field>
              <Field label="アイドル名・グループ名">
                <Input {...register("idol")} />
              </Field>
              <Field label="詳細">
                <Input {...register("text")} />
              </Field>
              <Input type="hidden" value={valueId} {...register("pramsId")} />
              <Button type="submit" w="100%" bg="#f9a8d4" fontWeight="bold">
                登録
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>
      <Menu pageId={undefined} />
    </Box>
  );
};

export default Answer;
