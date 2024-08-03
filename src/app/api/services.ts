import { useMutation, useQuery } from "@tanstack/react-query";
import { listMee6Members, searchDiscordMember, sendClaimRewardRequest, sendClaimXPRequest, sendPoW } from "./callers";

export const apiRouteKey = {
  searchMember: "searchMember",
  mee6Members: "mee6Members",
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

export const useListMee6Members = () => {
  return useQuery({
    queryKey: [apiRouteKey.mee6Members],
    queryFn: () => listMee6Members(),
  });
};
