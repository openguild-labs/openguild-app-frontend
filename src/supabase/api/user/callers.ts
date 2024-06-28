import { studentEmailRegex, normalEmailRegex } from "@/constants/regex";
import { supabase } from "../..";

const EXPIRED_TIME = 60 * 60; // 1 hour

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
  console.log(walletAddress, userUpdate);
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

export const uploadAvatar = async (userID: number, filename: string, file: Blob) => {
  const { data, error: uploadingError } = await supabase.storage.from("avatars").upload(`${userID}/${filename}`, file);
  if (uploadingError !== null || data === null) {
    console.error("Error uploading image: ", uploadingError.message);
    return "";
  }

  const { error: updatingError } = await supabase.from("user").update({ avatar: data.path }).eq("id", userID);
  if (updatingError !== null) {
    console.error("Error updating user avatar: ", updatingError.message);
  }
};

export const getAvatarURL = async (avatar: string) => {
  if (avatar === "") {
    console.error("avatar is invalid");
    return "";
  }

  const { data, error } = await supabase.storage.from("banners").createSignedUrl(avatar, EXPIRED_TIME);
  if (error !== null || data === null) {
    console.error("Error fetching avatar: ", error.message);
    return "";
  }

  return data.signedUrl;
};
