import { studentEmailRegex, normalEmailRegex } from "@/constants/regex";
import { supabase } from "../..";

export const createUser = async (userCreation: TUserCreation) => {
  if (userCreation.email !== undefined && !normalEmailRegex.test(userCreation.email)) {
    return { message: "Invalid email" } as TError;
  }

  let isStudent = false;
  if (userCreation.email !== undefined && studentEmailRegex.test(userCreation.email)) {
    isStudent = true;
  }

  const { data, error } = await supabase
    .from("user")
    .insert([{ ...userCreation, is_student: isStudent }])
    .select<string, TUserModel>();

  if (error !== null || data === null) {
    return { message: error.message || "Error creating user" } as TError;
  }

  return data;
};

export const getUser = async (walletAddress: string) => {
  const { data, error } = await supabase.from("user").select<string, TUserModel>().eq("wallet_address", walletAddress);

  if (error !== null || data === null) {
    return { message: error.message || "Error getting user" } as TError;
  }

  return data[0];
};

export const updateUser = async (walletAddress: string, userUpdate: TUserUpdate) => {
  if (Object.keys(userUpdate).length === 0) {
    return { message: "No data to update" } as TError;
  }

  if (userUpdate.email !== undefined && !normalEmailRegex.test(userUpdate.email)) {
    return { message: "Invalid email" } as TError;
  }

  let isStudent = false;
  if (userUpdate.email !== undefined && studentEmailRegex.test(userUpdate.email)) {
    isStudent = true;
  }

  const { data, error } = await supabase
    .from("user")
    .update({ ...userUpdate, is_student: isStudent })
    .eq("wallet_address", walletAddress)
    .select<string, TUserModel>();

  if (error !== null || data === null) {
    return { message: error.message || "Error updating user" } as TError;
  }

  return data[0];
};
