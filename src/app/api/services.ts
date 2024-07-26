import { useMutation } from "@tanstack/react-query";
import { sendClaimRewardRequest, sendClaimXPRequest, sendPoW } from "./callers";

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
