import { AppProviders } from "./AppProvider";
import "../index.css";
import "../tiptap.css";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/Layout/Layout";
import type { Metadata, ResolvingMetadata } from "next";
import { headers } from "next/headers";
import { getMission } from "@/supabase/api/mission/callers";

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
function extractId(url: string): string | null {
  const query = url.split("?")[1];
  if (!query) return null;
  const params = new URLSearchParams(query);
  const id = params.get("id");
  return id || null;
}
export async function generateMetadata({ params, searchParams }: Props, state: any): Promise<Metadata> {
  try {
    const pathname = getPathnameFromMetadataState(state) ?? "";
    if (pathname.includes("/mission-detail")) {
      const id = extractId(pathname);
      const res = await getMission(id);
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
  } catch (error) {
    console.log({ error });
    return {
      title: "TEST METADATA",
    };
  }
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/png" href="/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>OpenGuild</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      </Head> */}
      <body className="text-black" suppressHydrationWarning={true}>
        <AppProviders>
          <div id="root">
            <Layout>{children}</Layout>
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
