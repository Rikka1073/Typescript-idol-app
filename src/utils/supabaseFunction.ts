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
  const { data, error } = await supabase.from("clothes").select("*");
  if (error) {
    console.log("Error fetching data with clothes:", error);
  } else {
    console.log("Fetched data with clothes:", data);
  }

  if (data) {
    return data;
  } else {
    return [];
  }
};

export const addAnswer = async (link: string, idol: string, text: string, pramsId: string) => {
  const { error } = await supabase
    .from("answers")
    .insert({ link: link, idol: idol, text: text, pramsId: pramsId });
  if (error) {
    console.log("Error fetching data with answers:", error);
  }
};

export const getAnswer = async () => {
  const { data, error } = await supabase.from("answers").select("*");
  if (error) {
    console.log("Error fetching data with answers:", error);
  } else {
    console.log("Fetched data with answers:", data);
  }
  return data;
};
