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
    console.log(data);
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
  console.log(paramsId);
  console.log(valueId);
  return (
    <Box
      pt="95px"
      px={5}
      bgGradient="to-tl"
      gradientTo="red.300"
      gradientVia="pink.200"
      gradientFrom="purple.200"
      h="vh"
    >
      <Header />
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
            <Button type="submit" w="50%">
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
      <Menu pageId={null} />
    </Box>
  );
};

export default Answer;
