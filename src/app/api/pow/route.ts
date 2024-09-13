import { DISCORD_API_BASE_URL, DISCORD_BOT_TOKEN, DISCORD_POW_CHANNEL_ID, MAX_THREAD_NAME_LENGTH } from "@/constants/discord";
import { NextRequest } from "next/server";
import { shortenString } from "@/utils/stringUtils";

export async function POST(request: NextRequest) {
  const data = (await request.json()) as TDiscordCreateThreadRequest;
  console.log("=== data ", data);
  const res = await fetch(`${DISCORD_API_BASE_URL}/channels/${DISCORD_POW_CHANNEL_ID}/threads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "PostmanRuntime/7.40.0",
      Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
    },
    body: JSON.stringify({
      name: `${shortenString(`[PoW][@${data.discord_name}] ${data.task_name}`, MAX_THREAD_NAME_LENGTH - 3)}`,
      message: {
        content: `<@${data.user_id}> completed the task: **${data.task_name}** \n\nMission: **${data.mission_name}**!`,
        embeds: [
          {
            description: data.proof,
            image: {
              url: data.imageURL,
            },
          },
        ],
      },
    }),
  });
  const r = await res.json();
  console.log("=== res ", r);
  return Response.json(res);
}
