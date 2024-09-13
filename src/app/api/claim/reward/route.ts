import { DISCORD_API_BASE_URL, DISCORD_BOT_TOKEN, DISCORD_CLAIM_CHANNEL_ID, MAX_THREAD_NAME_LENGTH } from "@/constants/discord";
import { NextRequest } from "next/server";
import { shortenString } from "@/utils/stringUtils";

export async function POST(request: NextRequest) {
  const data = (await request.json()) as TDiscordCreateClaimRewardRequest;
  console.log("=== data ", data);
  const res = await fetch(`${DISCORD_API_BASE_URL}/channels/${DISCORD_CLAIM_CHANNEL_ID}/threads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "PostmanRuntime/7.40.0",
      Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
    },
    body: JSON.stringify({
      name: `${shortenString(`[Reward] ${data.rewardName}`, MAX_THREAD_NAME_LENGTH - 3)}`,
      message: {
        content: `<@${data.userID}> completed all missions to claim the **${data.rewardName}** reward!`,
      },
    }),
  });
  const r = await res.json();
  console.log("=== res ", r);
  return Response.json(res);
}
