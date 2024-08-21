import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/Layout/Layout";
import Providers from "@/components/Providers";
import "../index.css";
import "../tiptap.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenGuild",
  description: "An open community driven by Web 3.0 builders elevating Polkadot",
  openGraph: {
    title: "OpenGuild",
    description: "An open community driven by Web 3.0 builders elevating Polkadot",
    images: ["https://xszmofveuqthudzkhkmx.supabase.co/storage/v1/object/public/common/banner.jpg"],
  },
  twitter: {
    title: "OpenGuild",
    description: "An open community driven by Web 3.0 builders elevating Polkadot",
    images: ["https://xszmofveuqthudzkhkmx.supabase.co/storage/v1/object/public/common/banner.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
