import { supabase } from "./supabase";

export const getAllUsersData = async () => {
  const { data, error } = await supabase.from("users_id").select("*");

  if (error) {
    console.log("Error fetching data with users_id:", error);
  } else {
    console.log("Fetched data with users_id:", data);
  }

  return data;
};

export const createUser = async (username: string, password: string) => {
  const { data, error } = await supabase
    .from("users_id")
    .insert({
      username: username,
      password: password,
    })
    .select("*");

  if (error) {
    console.log("Error fetching data with users:", error);
  } else {
    console.log("Fetched data with users:", data);
  }
};

export const fetchImages = async () => {
  const { data, error } = await supabase.storage.from("pictures").list("Clothes");
  if (data) {
    console.log(data);
    const filteredImages = data.filter((image) => image.name !== ".emptyFolderPlaceholder");
    const urls = await Promise.all(
      filteredImages.map(async (image) => {
        const { data } = supabase.storage.from("pictures").getPublicUrl(`Clothes/${image.name}`);
        console.log(data.publicUrl);
        return data.publicUrl;
      })
    );
    return urls;
  } else {
    console.error(error);
  }
};
