import { DISCORD_API_BASE_URL, DISCORD_BOT_TOKEN, DISCORD_GUILD_ID } from "@/constants/discord";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const after = searchParams.get("after");
  console.log("=== after ", after);
  let query = "limit=1000";
  if (after !== null && after !== "") {
    query += `&after=${after}`;
  }
  const res = await fetch(`${DISCORD_API_BASE_URL}/guilds/${DISCORD_GUILD_ID}/members?${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "PostmanRuntime/7.40.0",
      Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
    },
  });
  const data = await res.json();
  console.log("=== res ", data);
  return Response.json({ data });
}
