import { useMutation, useQuery } from "@tanstack/react-query";
import { createUser, getUser } from "./callers";

export const userKey = {
  user: (email: string) => ["user", email],
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (userCreation: TUserCreation) => createUser(userCreation),
    onSuccess: (resp) => {
      console.log(resp);
    },
  });
};

export const useGetUser = (email: string) => {
  return useQuery({
    queryKey: userKey.user(email),
    queryFn: () => getUser(email),
  });
};
