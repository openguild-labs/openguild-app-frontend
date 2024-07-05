import { useMutation, useQuery } from "@tanstack/react-query";
import { createUser, getUser, updateUser } from "./callers";

export const userKey = {
  user: "user",
  avatar: "avatar",
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (userCreation: TUserCreation) => createUser(userCreation),
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
  });
};
