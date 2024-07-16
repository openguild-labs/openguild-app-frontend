import { supabase } from "@/supabase";
import { getStatusMission, getStatusTypeMission, uploadPoWImage } from "./utils";
import { MISSION_STATUS__TYPE } from "@/constants/mission";

const PAGE_LIMIT = 8;
const EXPIRED_TIME = 60 * 60; // 1 hour

const getBannerPromises = (bannerPath: string) => {
  return supabase.storage.from("banners").createSignedUrl(bannerPath, EXPIRED_TIME);
};

export const listMissions = async (page: number, search: string, missionType: string, categoryID: string) => {
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

  const now = new Date().toISOString().split("T")[0];
  switch (missionType) {
    case MISSION_STATUS__TYPE.IN_PROGRESS:
      missionPromise = missionPromise.gt("end_date", now).lte("start_date", now);
      break;
    case MISSION_STATUS__TYPE.ENDED:
      missionPromise = missionPromise.lt("end_date", now);
      break;
    case MISSION_STATUS__TYPE.NOT_START:
      missionPromise = missionPromise.gt("start_date", now);
      break;
  }

  if (categoryID !== "") {
    missionPromise = missionPromise.eq("mission_category_id", categoryID);
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

  const { data: subInfoList, error: fetchSubInfoError } = await supabase
    .from("mission_sub_info_view")
    .select<string, TMissionSubInfoView>();
  if (fetchSubInfoError !== null || subInfoList === null) {
    console.error("Error when get sub info");
    return [] as TMissionResponse[];
  }

  const dataResponse: TMissionResponse[] = data.map((mission, index) => {
    const subInfo = subInfoList.find((item) => item.mission_id === mission.id);
    const category = subInfo?.category || "";
    const xp = subInfo?.total_xp || 0;
    return {
      id: mission.id,
      title: mission.title,
      status: getStatusMission(mission.start_date, mission.end_date),
      statusType: getStatusTypeMission(mission.start_date, mission.end_date),
      bannerURL: bannerListResponse[index].data?.signedUrl || "",
      category,
      xp,
    };
  });

  return dataResponse;
};

export const countTotalMission = async (search: string, missionType: string, categoryID: string) => {
  let countMissionPromise = supabase
    .from("mission")
    .select("id", { count: "exact" })
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  if (search !== "") {
    countMissionPromise = countMissionPromise.like("title", `%${search}%`);
  }

  const now = new Date().toISOString().split("T")[0];
  switch (missionType) {
    case MISSION_STATUS__TYPE.IN_PROGRESS:
      countMissionPromise = countMissionPromise.gt("end_date", now).lte("start_date", now);
      break;
    case MISSION_STATUS__TYPE.ENDED:
      countMissionPromise = countMissionPromise.lt("end_date", now);
      break;
    case MISSION_STATUS__TYPE.NOT_START:
      countMissionPromise = countMissionPromise.gt("start_date", now);
      break;
  }

  if (categoryID !== "") {
    countMissionPromise = countMissionPromise.eq("mission_category_id", categoryID);
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
  const getParticipantQuantityPromise = supabase.from("participant_quantity_view").select<string, TParticipantQuantityView>();

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
  let image = "";
  if (creation.file !== null) {
    image = await uploadPoWImage(creation.user_id, creation.task_id, creation.file);
  }

  const { error } = await supabase.from("proofs_of_work").insert({
    user_id: creation.user_id,
    task_id: creation.task_id,
    proof: creation.proof,
    image,
  });
  if (error !== null) {
    console.error("Error creating proofs of work");
  }
};

export const listMissionsCategories = async () => {
  const { data, error } = await supabase
    .from("mission_category")
    .select<string, TMissionCategoryModel>()
    .is("deleted_at", null)
    .order("id", { ascending: true });

  if (error !== null || data === null) {
    console.error("Error fetching mission categories");
    return [] as TMissionCategoryModel[];
  }

  return data;
};
