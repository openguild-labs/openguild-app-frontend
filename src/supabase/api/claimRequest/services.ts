import { useMutation, useQuery } from "@tanstack/react-query";
import { checkClaimRequest, createClaimRequest } from "./callers";

export const claimRequestKey = {
  claimRequest: "claimRequest",
};

export const useCreateClaimRequest = () => {
  return useMutation({
    mutationFn: (req: TClaimRequest) => createClaimRequest(req),
  });
};

export const useCheckClaimRequest = (req: TClaimRequest) => {
  return useQuery({
    queryKey: [claimRequestKey.claimRequest, req.user_id, req.object_id, req.type],
    queryFn: () => checkClaimRequest(req),
  });
};
