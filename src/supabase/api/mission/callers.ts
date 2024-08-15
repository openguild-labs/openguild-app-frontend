import { supabase } from "@/supabase";
import { getStatusMission, getStatusTypeMission, uploadPoWImage } from "./utils";
import { MISSION_STATUS__TYPE } from "@/constants/mission";

const PAGE_LIMIT = 8;

const getListMissionPromise = (page: number, search: string, missionType: string, categoryID: string) => {
  let missionPromise = supabase
    .from("mission")
    .select<string, TMissionModel>()
    .is("deleted_at", null)
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (page !== -1) {
    const start = page * PAGE_LIMIT;
    missionPromise = missionPromise.range(start, start + PAGE_LIMIT - 1);
  }

  if (search !== "") {
    missionPromise = missionPromise.ilike("title", `%${search}%`);
  }

  const now = new Date().toISOString().split("T")[0];
  switch (missionType) {
    case MISSION_STATUS__TYPE.IN_PROGRESS:
      missionPromise = missionPromise.gte("end_date", now).lte("start_date", now);
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

  return missionPromise;
};

export const listMissions = async (page: number, search: string, missionType: string, categoryID: string) => {
  const missionPromise = getListMissionPromise(page, search, missionType, categoryID);
  const { data, error } = await missionPromise;
  if (error !== null) {
    console.error("Error fetching missions");
    return [] as TMissionResponse[];
  }

  if (data.length === 0) {
    return [];
  }

  const banners = data.map((item) => item.banner);
  const bannerListResp = await Promise.all(banners.map((banner) => supabase.storage.from("banners").getPublicUrl(banner)));

  const { data: subInfoList, error: fetchSubInfoError } = await supabase
    .from("mission_sub_info_view")
    .select<string, TMissionSubInfoView>();
  const errorIsNotNull = fetchSubInfoError !== null;
  const dataIsNull = subInfoList === null;
  if (errorIsNotNull || dataIsNull) {
    console.error("Error when get banner url");
    return [] as TMissionResponse[];
  }

  const dataResponse: TMissionResponse[] = data.map((mission, index) => {
    const subInfo = subInfoList.find((item) => item.mission_id === mission.id);
    const category = subInfo?.category || "";
    const xp = subInfo?.total_xp || 0;
    const banner = bannerListResp[index];
    return {
      id: mission.id,
      title: mission.title,
      status: getStatusMission(mission.start_date, mission.end_date),
      statusType: getStatusTypeMission(mission.start_date, mission.end_date),
      bannerURL: banner?.data.publicUrl || "",
      category,
      xp,
      isFeatured: mission.is_featured,
    };
  });

  return dataResponse;
};

export const countTotalMission = async (search: string, missionType: string, categoryID: string) => {
  const countMissionPromise = getListMissionPromise(-1, search, missionType, categoryID);
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
  const getBannerPromise = supabase.storage.from("banners").getPublicUrl(mission.banner);
  const getTasksPromise = supabase
    .from("task")
    .select<string, TTaskModel>()
    .eq("mission_id", id)
    .is("deleted_at", null)
    .order("id", { ascending: true });
  const getParticipantQuantityPromise = supabase
    .from("participant_quantity_view")
    .select<string, TParticipantQuantityView>()
    .eq("mission_id", id);
  const getSubInfoPromise = supabase.from("mission_sub_info_view").select<string, TMissionSubInfoView>().eq("mission_id", id);

  const [
    { data: bannerData },
    { data: tasksData, error: fetchTasksError },
    { data: participantQuantityData, error: fetchParticipantQuantityError },
    { data: subInfoData, error: fetchSubInfoError },
  ] = await Promise.all([getBannerPromise, getTasksPromise, getParticipantQuantityPromise, getSubInfoPromise]);

  const errorIsNotNull = fetchTasksError !== null || fetchParticipantQuantityError !== null || fetchSubInfoError !== null;
  const dataIsNull = bannerData === null || tasksData === null || participantQuantityData === null || subInfoData === null;
  if (errorIsNotNull || dataIsNull) {
    console.error("Error fetching data");
    return undefined;
  }

  const bannerURL = bannerData.publicUrl;
  return {
    ...mission,
    bannerURL,
    tasks: tasksData,
    category: subInfoData[0].category,
    participants: participantQuantityData[0]?.quantity || 0,
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
  let publicURL = "";
  if (creation.file !== null) {
    image = await uploadPoWImage(creation.user_id, creation.task_id, creation.file);
    const { data } = supabase.storage.from("proofs_of_work").getPublicUrl(image);
    publicURL = data.publicUrl;
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

  return publicURL;
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
