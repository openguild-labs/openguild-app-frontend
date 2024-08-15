import { DISCORD_AUTH_CLIENT_ID, DISCORD_AUTH_CLIENT_SECRET } from "@/constants/discord";
import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

// https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes
const scopes = ["identify"].join(" ");

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    DiscordProvider({
      clientId: DISCORD_AUTH_CLIENT_ID,
      clientSecret: DISCORD_AUTH_CLIENT_SECRET,
      authorization: { params: { scope: scopes } },
    }),
  ],
});

export { handler as GET, handler as POST };
