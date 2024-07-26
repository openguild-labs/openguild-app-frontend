import { supabase } from "@/supabase";

export const checkClaimRequest = async (req: TClaimRequest) => {
  const { data, error } = await supabase
    .from("claim_request")
    .select<string, TClaimRequestModel>()
    .eq("user_id", req.user_id)
    .eq("object_id", req.object_id)
    .eq("type", req.type)
    .is("deleted_at", null);
  if (error !== null || data === null) {
    console.error(error.message || "Error checking claim request");
    return false;
  }

  return data.length > 0;
};

export const createClaimRequest = async (req: TClaimRequest) => {
  const { error } = await supabase.from("claim_request").insert(req);
  if (error !== null) {
    console.error(error.message || "Error creating claim request");
    return false;
  }

  return true;
};
