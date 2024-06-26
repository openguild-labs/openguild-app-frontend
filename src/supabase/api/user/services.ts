import { useMutation, useQuery } from "@tanstack/react-query";
import { createUser, getAvatarURL, getUser, updateUser, uploadAvatar } from "./callers";

export const userKey = {
  user: "user",
  avatar: "avatar",
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (userCreation: TUserCreation) => createUser(userCreation),
    onSuccess: (resp) => {
      console.log(resp);
    },
  });
};

export const useGetUser = (walletAddress: string) => {
  return useQuery({
    queryKey: [userKey.user, walletAddress],
    queryFn: () => getUser(walletAddress),
  });
};

export const useUpdateUser = (walletAddress: string) => {
  return useMutation({
    mutationFn: (userUpdate: TUserUpdate) => updateUser(walletAddress, userUpdate),
    onSuccess: (resp) => {
      console.log(resp);
    },
  });
};

export const useUploadAvatar = () => {
  return useMutation({
    mutationFn: (req: TUploadAvatarRequest) => {
      return uploadAvatar(req.userID, req.filename, req.file);
    },
  });
};

export const useGetAvatarURL = (avatar: string) => {
  return useQuery({
    queryKey: [userKey.avatar, avatar],
    queryFn: () => {
      return getAvatarURL(avatar);
    },
  });
};
