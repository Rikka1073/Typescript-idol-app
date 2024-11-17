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
