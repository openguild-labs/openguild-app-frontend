import { studentEmailRegex } from "@/constants/regex";
import { supabase } from "../..";

export const createUser = async (userCreation: TUserCreation) => {
  const { data, error } = await supabase
    .from("user")
    .insert([{ ...userCreation, is_student: studentEmailRegex.test(userCreation.email) }])
    .select<string, TUserModel>();

  if (error !== null || data === null) {
    return { message: error.message || "Error creating user" } as TError;
  }

  return data;
};

export const getUser = async (email: string) => {
  const { data, error } = await supabase.from("user").select<string, TUserModel>().eq("email", email);

  if (error !== null || data === null) {
    return { message: error.message || "Error getting user" } as TError;
  }

  return data[0];
};
