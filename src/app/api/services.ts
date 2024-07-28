import { useMutation, useQuery } from "@tanstack/react-query";
import { searchDiscordMember, sendClaimRewardRequest, sendClaimXPRequest, sendPoW } from "./callers";

export const apiRouteKey = {
  searchMember: "searchMember",
};

export const useSendDiscordPoW = () => {
  return useMutation({
    mutationFn: (req: TDiscordCreateThreadRequest) => sendPoW(req),
  });
};

export const useSendClaimXPRequest = () => {
  return useMutation({
    mutationFn: (req: TDiscordCreateClaimXPRequest) => sendClaimXPRequest(req),
  });
};

export const useSendClaimRewardRequest = () => {
  return useMutation({
    mutationFn: (req: TDiscordCreateClaimRewardRequest) => sendClaimRewardRequest(req),
  });
};

export const useSearchDiscordMember = (username: string) => {
  return useQuery({
    queryKey: [apiRouteKey.searchMember, username],
    queryFn: () => searchDiscordMember(username),
  });
};
