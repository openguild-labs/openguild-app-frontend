import { rewardType } from "@/constants/reward";
import { supabase } from "@/supabase";

const PAGE_LIMIT = 8;
const EXPIRED_TIME = 60 * 60; // 1 hour

const getListRewardPromise = (page: number, search: string, categoryID: string) => {
  let listPromise = supabase
    .from("reward")
    .select<string, TRewardModel>("*")
    .is("deleted_at", null)

    .order("id", { ascending: true });

  if (page !== -1) {
    const start = page * PAGE_LIMIT;
    listPromise = listPromise.range(start, start + PAGE_LIMIT - 1);
  }

  if (search !== "") {
    listPromise = listPromise.like("name", `%${search}%`);
  }

  if (categoryID !== "") {
    listPromise = listPromise.eq("type", Object.values(rewardType)[Number(categoryID)]);
  }

  return listPromise;
};

export const listRewards = async (page: number, search: string, categoryID: string) => {
  const listPromise = getListRewardPromise(page, search, categoryID);
  const { data, error } = await listPromise;
  if (error !== null || data === null) {
    console.error("Error fetching rewards");
    return [] as TRewardResponse[];
  }

  if (data.length === 0) {
    return [];
  }

  const images = data.map((reward) => {
    return reward.image;
  });
  const { data: image, error: imageError } = await supabase.storage.from("reward_images").createSignedUrls(images, EXPIRED_TIME);
  if (imageError !== null || image === null) {
    console.error("Error creating signed URLs");
    return [] as TRewardResponse[];
  }

  const result = data.reduce<TRewardResponse[]>((acc, cur) => {
    const signedURL = image.find((image) => image.path === cur.image)?.signedUrl || "";
    if (signedURL !== undefined) {
      acc.push({ ...cur, imageURL: signedURL });
    }
    return acc;
  }, []);

  return result;
};

export const countTotalRewards = async (search: string, categoryID: string) => {
  const listPromise = getListRewardPromise(-1, search, categoryID);
  const { data, error } = await listPromise;
  if (error !== null || data === null) {
    console.error("Error fetching rewards");
    return 0;
  }

  return data.length;
};
