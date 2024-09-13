import { DISCORD_API_BASE_URL, DISCORD_BOT_TOKEN, DISCORD_CLAIM_CHANNEL_ID, MAX_THREAD_NAME_LENGTH } from "@/constants/discord";
import { NextRequest } from "next/server";
import { shortenString } from "@/utils/stringUtils";

export async function POST(request: NextRequest) {
  const data = (await request.json()) as TDiscordCreateClaimXPRequest;
  console.log("=== data ", data);
  const res = await fetch(`${DISCORD_API_BASE_URL}/channels/${DISCORD_CLAIM_CHANNEL_ID}/threads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "PostmanRuntime/7.40.0",
      Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
    },
    body: JSON.stringify({
      name: `${shortenString(`[XP] ${data.missionName}`, MAX_THREAD_NAME_LENGTH - 3)}`,
      message: {
        content: `<@${data.userID}> completed the **${data.missionName}** mission with **${data.xp}** XP!`,
      },
    }),
  });
  const r = await res.json();
  console.log("=== res ", r);
  return Response.json(res);
}
