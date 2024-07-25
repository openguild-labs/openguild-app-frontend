export const sendPoW = async (req: TDiscordCreateThreadRequest) => {
  return fetch("/api/pow", {
    method: "POST",
    body: JSON.stringify(req),
  });
};
