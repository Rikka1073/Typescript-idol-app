import { Box, Input, Stack, Text } from "@chakra-ui/react";
import Menu from "../Templetes/Menu";
import Header from "../Templetes/Header";
import { Button } from "../ui/button";
import { Field } from "../ui/field";
import { useForm } from "react-hook-form";

type Inputs = {
  link: string;
  idol: string;
  input: string;
};

const Answer = () => {
  const methods = useForm<Inputs>();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;
  const onsubmit = handleSubmit((data) => console.log(data));
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
            <Field label="リンク" invalid={!!errors.link} errorText={errors.link?.message}>
              <Input {...register("link", { required: "リンクを入力してください" })} />
            </Field>
            <Field label="アイドル名・グループ名">
              <Input {...register("idol")} />
            </Field>
            <Field label="詳細">
              <Input {...register("input")} />
            </Field>
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
