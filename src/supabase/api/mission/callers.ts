import { supabase } from "@/supabase";
import { getStatusMission, getStatusTypeMission } from "./utils";

const PAGE_LIMIT = 8;
const EXPIRED_TIME = 60 * 60; // 1 hour

const getBannerPromises = (bannerPath: string) => {
  return supabase.storage.from("banners").createSignedUrl(bannerPath, EXPIRED_TIME);
};

const getCategoryPromises = (id: string) => {
  return supabase.from("mission_category").select<string, TMissionCategoryModel>().eq("id", id).is("deleted_at", null);
};

export const listMissions = async (page: number, search: string) => {
  const start = page * PAGE_LIMIT;

  let missionPromise = supabase
    .from("mission")
    .select<string, TMissionModel>()
    .is("deleted_at", null)
    .range(start, start + PAGE_LIMIT - 1)
    .order("created_at", { ascending: false });

  if (search !== "") {
    missionPromise = missionPromise.like("title", `%${search}%`);
  }

  const { data, error } = await missionPromise;
  if (error !== null) {
    console.error("Error fetching missions");
    return [] as TMissionResponse[];
  }

  const bannerListResponse = await Promise.all(data.map((item) => getBannerPromises(item.banner)));
  bannerListResponse.forEach((resp) => {
    if (resp.error !== null || resp.data === null) {
      console.error("Error when get banner url");
      return [];
    }
  });

  const categoryListResponse = await Promise.all(data.map((item) => getCategoryPromises(item.mission_category_id)));
  categoryListResponse.forEach((resp) => {
    if (resp.error !== null || resp.data === null) {
      console.error("Error when get category");
      return [];
    }
  });

  const dataResponse: TMissionResponse[] = data.map((mission, index) => {
    const categoryResult = categoryListResponse[index].data as TMissionCategoryModel[];
    return {
      id: mission.id,
      title: mission.title,
      status: getStatusMission(mission.start_date, mission.end_date),
      statusType: getStatusTypeMission(mission.start_date, mission.end_date),
      bannerURL: bannerListResponse[index].data?.signedUrl || "",
      category: categoryResult[0].name || "",
    };
  });

  return dataResponse;
};

export const countTotalMission = async (search: string) => {
  let countMissionPromise = supabase
    .from("mission")
    .select("id", { count: "exact" })
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  if (search !== "") {
    countMissionPromise = countMissionPromise.like("title", `%${search}%`);
  }

  const { data, error } = await countMissionPromise;

  if (error !== null) {
    console.error("Error fetching missions");
    return 0;
  }

  return data.length;
};

export const getMission = async (id: string) => {
  const { data, error } = await supabase
    .from("mission")
    .select<string, TMissionModel>()
    .eq("id", id)
    .is("deleted_at", null)
    .order("id", { ascending: true });
  if (error !== null) {
    console.error("Error fetching mission");
    return undefined;
  }

  if (data.length === 0) {
    console.error("Mission not found");
    return undefined;
  }

  const mission = data[0];
  const getBannerPromise = supabase.storage.from("banners").createSignedUrl(mission.banner, EXPIRED_TIME);
  const getTasksPromise = supabase
    .from("task")
    .select<string, TTaskModel>()
    .eq("mission_id", id)
    .is("deleted_at", null)
    .order("id", { ascending: true });
  const getParticipantQuantityPromise = supabase.from("participant_quantity").select<string, TParticipantQuantityResponse>();

  const [
    { data: bannerData, error: fetchBannerError },
    { data: tasksData, error: fetchTasksError },
    { data: participantQuantityData, error: fetchParticipantQuantityError },
  ] = await Promise.all([getBannerPromise, getTasksPromise, getParticipantQuantityPromise]);

  const errorIsNotNull = fetchBannerError !== null || fetchTasksError !== null || fetchParticipantQuantityError !== null;
  const dataIsNull = bannerData === null || tasksData === null || participantQuantityData === null;
  if (errorIsNotNull || dataIsNull) {
    console.error("Error fetching data");
    return undefined;
  }

  const bannerURL = bannerData.signedUrl;
  return {
    ...mission,
    bannerURL,
    tasks: tasksData,
    participants: participantQuantityData.find((p) => p.mission_id === mission.id)?.quantity || 0,
  } as TMissionDetailResponse;
};

export const getCompletedTasks = async (userID: number, taskIDs: number[]) => {
  const { data, error } = await supabase
    .from("completed_task")
    .select<string, TCompletedTaskModel>("*")
    .eq("user_id", userID)
    .in("task_id", taskIDs)
    .is("deleted_at", null);

  if (error !== null) {
    console.error("Error fetching completed tasks");
    return [];
  }

  return data;
};

export const completeTask = async (userID: number, taskID: number) => {
  const { error } = await supabase.from("completed_task").insert({ user_id: userID, task_id: taskID, completed_at: new Date() });

  if (error !== null) {
    console.error("Error completing task");
    return false;
  }

  return true;
};

export const createProofsOfWork = async (creation: TProofsOfWorkCreation) => {
  const { error } = await supabase.from("proofs_of_work").insert({
    user_id: creation.user_id,
    task_id: creation.task_id,
    link: creation.link ? creation.link : "",
    image: creation.image ? creation.image : "",
  });
  if (error !== null) {
    console.error("Error creating proofs of work");
  }
};
