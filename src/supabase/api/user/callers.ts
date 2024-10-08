import { studentEmailRegex, normalEmailRegex } from "@/constants/regex";
import { supabase } from "../..";
import { toast } from "react-toastify";

export const createUser = async (userCreation: TUserCreation) => {
  let isStudent = false;
  if (userCreation.email !== undefined && userCreation.email !== "") {
    if (!normalEmailRegex.test(userCreation.email)) {
      toast.error("Invalid email");
      return [];
    }

    if (studentEmailRegex.test(userCreation.email)) {
      isStudent = true;
    }
  }

  // check email is unique
  const { data: emailExists, error: emailExistsError } = await supabase
    .from("user")
    .select<string, TUserModel>()
    .eq("email", userCreation.email);
  if (emailExistsError !== null || emailExists === null) {
    console.error(emailExistsError.message || "Error checking email");
  }

  if (emailExists?.length !== 0) {
    toast.warn("Email already exists");
    return [];
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

  if (userUpdate.username !== undefined && userUpdate.username !== "") {
    const { data, error } = await supabase
      .from("user")
      .select<string, TUserModel>()
      .eq("username", userUpdate.username)
      .is("deleted_at", null);
    if (error !== null || data === null) {
      console.error(error.message || "Error getting user");
      return undefined;
    }

    if (data.length > 0 && data[0].wallet_address !== walletAddress) {
      toast.error("Username already exists");
      return undefined;
    }
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

export const getUserByUsername = async (username: string) => {
  const { data, error } = await supabase.from("user").select<string, TUserModel>().eq("username", username).is("deleted_at", null);

  if (error !== null || data === null) {
    console.error(error.message || "Error getting user");
    return undefined;
  }

  return data[0];
};

export const checkUniqueDiscord = async (discord: string) => {
  const { data, error } = await supabase.from("user").select<string, TUserModel>().eq("discord", discord).is("deleted_at", null);

  if (error !== null || data === null) {
    console.error(error.message || "Error checking unique discord");
    return false;
  }

  return data.length === 0;
};
