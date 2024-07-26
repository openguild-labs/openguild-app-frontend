export const sendPoW = async (req: TDiscordCreateThreadRequest) => {
  return fetch("/api/pow", {
    method: "POST",
    body: JSON.stringify(req),
  });
};

export const sendClaimXPRequest = async (req: TDiscordCreateClaimXPRequest) => {
  return fetch("/api/claim/xp", {
    method: "POST",
    body: JSON.stringify(req),
  });
};

export const sendClaimRewardRequest = async (req: TDiscordCreateClaimRewardRequest) => {
  return fetch("/api/claim/reward", {
    method: "POST",
    body: JSON.stringify(req),
  });
};
