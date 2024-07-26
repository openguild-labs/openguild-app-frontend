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

export const getReward = async (id: string, userID: number) => {
  const { data, error } = await supabase
    .from("reward")
    .select<string, TRewardModel>()
    .eq("id", id)
    .is("deleted_at", null)
    .order("id", { ascending: true });
  if (error !== null || data === null) {
    console.error("Error fetching reward");
    return undefined;
  }

  const reward = data[0];
  const missionIDs = reward.requirements.split(",");

  const { data: missionsData, error: fetchMissionsError } = await supabase
    .from("mission")
    .select<string, TMissionTasks>(
      `
        *,
        task (
          id
        )
      `
    )
    .in("id", missionIDs)
    .is("deleted_at", null)
    .order("id", { ascending: true });
  if (fetchMissionsError !== null || missionsData === null) {
    console.error("Error fetching missions");
    return undefined;
  }

  const banners = missionsData.map((item) => item.banner);
  const rewardImagePromise = supabase.storage.from("reward_images").createSignedUrl(reward.image, EXPIRED_TIME);
  const completedMissionsPromise = supabase
    .from("completed_mission_view")
    .select<string, TCompletedMissionResponse>()
    .eq("user_id", userID)
    .in("mission_id", missionIDs);

  const bannersPromise = supabase.storage.from("banners").createSignedUrls(banners, EXPIRED_TIME);
  const [
    { data: image, error: fetchImageError },
    { data: bannerURLs, error: fetchBannerError },
    { data: completedMissions, error: fetchCompletedMissionsError },
  ] = await Promise.all([rewardImagePromise, bannersPromise, completedMissionsPromise]);
  const errorIsNotNull = fetchImageError !== null || fetchBannerError !== null || fetchCompletedMissionsError !== null;
  const dataIsNull = image === null || bannerURLs === null || completedMissions === null;
  if (errorIsNotNull || dataIsNull) {
    console.error("Error when get banner url");
    return undefined;
  }

  const requirements = missionsData.map((mission) => {
    const bannerURL = bannerURLs.find((item) => item.path === mission.banner)?.signedUrl || "";
    const isCompleted = completedMissions.find((item) => item.mission_id === mission.id)?.is_completed || false;
    return {
      id: mission.id,
      title: mission.title,
      bannerURL,
      isCompleted,
    } as TRequirementResponse;
  });
  return { ...reward, imageURL: image.signedUrl, requirements } as TRewardDetailsResponse;
};
