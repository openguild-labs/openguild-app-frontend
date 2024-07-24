import { AppProviders } from "./AppProvider";
import "../index.css";
import "../tiptap.css";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/Layout/Layout";
import { getMission } from "@/supabase/api/mission/callers";
import { missionDetailsPathRegex } from "@/constants/regex";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
const getPathnameFromMetadataState = (state: any): string | undefined => {
  const res = Object.getOwnPropertySymbols(state || {})
    .map((p) => state[p])
    .find((state) => state?.hasOwnProperty?.("urlPathname"));
  return res?.urlPathname;
};

export async function generateMetadata(_: Props, state: any) {
  try {
    const pathname = getPathnameFromMetadataState(state) ?? "";
    console.log({ pathname });
    if (missionDetailsPathRegex.test(pathname)) {
      const id = pathname.split("/").slice(-1)[0];
      console.log({ id });
      const res = await getMission(id as string);
      const title = res?.title;
      const banner = res?.bannerURL || "";
      return {
        title: title,
        openGraph: {
          images: [banner],
          title: title,
        },
        twitter: {
          description: title,
          title: title,
          images: banner,
          card: "summary_large_image",
        },
      };
    }
    return {
      title: "OpenGuild",
    };
  } catch (error) {
    console.log({ error });
    return {
      title: "TEST METADATA",
    };
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  console.log("HERE ????");
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/png" href="/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body className="text-black" suppressHydrationWarning={true}>
        <AppProviders>
          <Layout>{children}</Layout>
        </AppProviders>
      </body>
    </html>
  );
}
