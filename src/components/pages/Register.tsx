import { Box, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import { supabase } from "@/utils/supabase";
import { FileUploadDropzone, FileUploadList, FileUploadRoot } from "../ui/file-button";
import { Button } from "../ui/button";
import Menu from "../Templetes/Menu";
import Header from "../Templetes/Header";

const Register = () => {
  const navigate = useNavigate();
  const { handleSubmit, control, setValue } = useForm<{
    file: File | null;
  }>({
    defaultValues: { file: null },
  });

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

    const imageUrl = supabase.storage.from("pictures").getPublicUrl(`Clothes/${data.file.name}`);
    console.log(imageUrl);

    const { data: uploadDataTable, error: insetError } = await supabase.from("clothes").insert({
      file_name: data.file.name,
      file_url: imageUrl.data?.publicUrl,
    });

    if (error) {
      console.error("Error uploading file:", error);
      alert("既に登録されている画像です");
    } else if (insetError) {
      console.error("Error inserting file:", insetError);
    } else {
      console.log("File uploaded successfully:", uploadData, uploadDataTable);
      navigate("/Clothes");
    }
    setValue("file", null);
  };

  return (
    <Box
      pt={{ base: "90px", sm: "110px", md: "130px", lg: "150px" }}
      bg="red.200"
      h="vh"
      color="white"
      px={{ base: "20px", sm: "40px", md: "60px", lg: "80px" }}
    >
      <Box md={{ width: "50%", m: "auto" }}>
        <Header pageId={undefined} />
        <Text color="black" fontSize="2xl" mb={2}>
          服を探す
        </Text>
        <Text color="black" fontSize="base" mb={4}>
          探したいアイドルの服を登録しよう！
        </Text>
        <Box bg="white" p={4} rounded="md">
          <Stack>
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
                      <Text color="red.500" fontSize="sm" fontWeight="bold" mt={4}>
                        {fieldState.error.message}
                      </Text>
                    )}
                  </>
                )}
              />
              <Button type="submit" size="sm" bg="#f9a8d4" w="100%" fontWeight="bold" mt={4}>
                登録
              </Button>
            </form>
          </Stack>
        </Box>
      </Box>
      <Menu pageId={undefined} />
    </Box>
  );
};

export default Register;
