import { getMission } from "@/supabase/api/mission/callers";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params: { id } }: Props) {
  const res = await getMission(id);
  const title = res?.title;
  const banner = res?.bannerURL || "";
  return {
    title: title,
    description: title,
    openGraph: {
      title: title,
      description: title,
      images: [banner],
    },
    twitter: {
      title: title,
      description: title,
      images: [banner],
      card: "summary_large_image",
    },
  };
}

export { default } from "./MissionDetails";
