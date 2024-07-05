import { studentEmailRegex, normalEmailRegex } from "@/constants/regex";
import { supabase } from "../..";

export const createUser = async (userCreation: TUserCreation) => {
  if (userCreation.email !== undefined && !normalEmailRegex.test(userCreation.email)) {
    console.error("Invalid email");
    return [];
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
    console.error(error.message || "Error creating user");
    return [];
  }

  return data;
};

export const getUser = async (walletAddress: string) => {
  const { data, error } = await supabase
    .from("user")
    .select<string, TUserModel>()
    .eq("wallet_address", walletAddress)
    .is("deleted_at", null);

  if (error !== null || data === null) {
    console.error(error.message || "Error getting user");
    return undefined;
  }

  return data[0];
};

export const updateUser = async (walletAddress: string, userUpdate: TUserUpdate) => {
  if (Object.keys(userUpdate).length === 0) {
    console.error("No data to update");
    return undefined;
  }

  if (userUpdate.email !== undefined && !normalEmailRegex.test(userUpdate.email)) {
    console.error("Invalid email");
    return undefined;
  }

  let isStudent = false;
  if (userUpdate.email !== undefined && studentEmailRegex.test(userUpdate.email)) {
    isStudent = true;
  }

  const { data, error } = await supabase
    .from("user")
    .update({ ...userUpdate, is_student: isStudent })
    .eq("wallet_address", walletAddress)
    .is("deleted_at", null)
    .select<string, TUserModel>();

  if (error !== null || data === null) {
    console.error(error.message || "Error updating user");
    return undefined;
  }

  return data[0];
};
