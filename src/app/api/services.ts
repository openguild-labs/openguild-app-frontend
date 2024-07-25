import { useMutation } from "@tanstack/react-query";
import { sendPoW } from "./callers";

export const useSendDiscordPoW = () => {
  return useMutation({
    mutationFn: (req: TDiscordCreateThreadRequest) => sendPoW(req),
  });
};
