import { DISCORD_API_BASE_URL, DISCORD_BOT_TOKEN, DISCORD_POW_CHANNEL_ID } from "@/constants/discord";
import { NextRequest } from "next/server";

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
      name: data.name,
      message: {
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
