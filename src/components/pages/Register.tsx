import { Box, Center, Stack, Text } from "@chakra-ui/react";
import { IoIosAddCircle, IoIosHome, IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import { supabase } from "@/utils/supabase";
import { FileUploadDropzone, FileUploadList, FileUploadRoot } from "../ui/file-button";
import { Button } from "../ui/button";

const Register = () => {
  const navigate = useNavigate();
  const { handleSubmit, control, setValue, formState } = useForm<{ file: File | null }>({
    defaultValues: { file: null },
  });
  const { isValid } = formState;

  const onclickHome = () => {
    navigate("/Clothes");
  };

  const onchangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setValue("file", selectedFile);
  };

  const onSubmit = async (data: { file: File | null }) => {
    console.log("登録ボタンが押されました");
    if (!data.file) return;
    const { data: uploadData, error } = await supabase.storage
      .from("pictures")
      .upload(`Clothes/${data.file.name}`, data.file, {
        cacheControl: "3600",
        upsert: false,
      });
    if (error) {
      console.error("Error uploading file:", error);
      alert("既に登録されている画像です");
    } else {
      console.log("File uploaded successfully:", uploadData);
      navigate("/Clothes");
    }
    setValue("file", null);
  };

  return (
    <>
      <Box
        position="relative"
        bgGradient="to-tl"
        gradientTo="red.300"
        gradientVia="pink.200"
        gradientFrom="purple.200"
        h="vh"
        color="white"
        px={5}
      >
        <Box pt={10} md={{ width: "50%", m: "auto" }}>
          <Text color="black" fontSize="3xl" mb={2}>
            服を探す
          </Text>
          <Text color="black" fontSize="base" mb={6}>
            探したいアイドルの服を登録しよう！
          </Text>
          <Box bg="white" p={5} rounded="md">
            <Stack gap={5}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="file"
                  control={control}
                  rules={{
                    required: "画像をアップロードしてください",
                  }}
                  render={({ fieldState }) => (
                    <>
                      <FileUploadRoot onChange={onchangeImage} alignItems="stretch">
                        <FileUploadDropzone label="Drag and drop here to upload" color="black" />
                        <FileUploadList clearable />
                      </FileUploadRoot>
                      {fieldState.error && (
                        <Text color="red.500" fontSize="sm">
                          {fieldState.error.message}
                        </Text>
                      )}
                    </>
                  )}
                />
                <Button
                  type="submit"
                  size="sm"
                  bg="#f9a8d4"
                  w="100%"
                  fontWeight="bold"
                  mt={2}
                  disabled={!isValid}
                >
                  登録
                </Button>
              </form>
            </Stack>
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          position="fixed"
          bottom="0"
          left="0"
          width="100%"
          py={4}
          px={10}
          bg="white"
          md={{ px: "40", py: "8" }}
        >
          <Box onClick={onclickHome}>
            <Center>
              <IoIosHome size="35px" color="#f9a8d4" />
            </Center>
            <Text color="#f9a8d4">Home</Text>
          </Box>
          <Box color="#f9a8d4">
            <Center>
              <IoIosAddCircle size="35px" color="#f9a8d4" />
            </Center>
            <Text color="#f9a8d4">Add</Text>
          </Box>
          <Box color="#f9a8d4">
            <Center>
              <IoIosSearch size="35px" color="#f9a8d4" />
            </Center>
            <Text color="#f9a8d4">Search</Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Register;
