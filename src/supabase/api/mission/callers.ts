import { supabase } from "@/supabase";
import { getStatusMission } from "./utils";

const PAGE_LIMIT = 8;
const EXPIRED_TIME = 60 * 60; // 1 hour

const getBannerPromises = (bannerPath: string) => {
  return supabase.storage.from("banners").createSignedUrl(bannerPath, EXPIRED_TIME);
};

export const listMissions = async (page: number) => {
  const start = page * PAGE_LIMIT;

  const { data, error } = await supabase
    .from("mission")
    .select<string, TMissionModel>()
    .is("deleted_at", null)
    .range(start, start + PAGE_LIMIT - 1)
    .order("id", { ascending: true });

  if (error !== null) {
    console.error("Error fetching missions");
    return [] as TMissionResponse[];
  }

  const bannerListResponse = await Promise.all(data.map((item) => getBannerPromises(item.banner)));
  bannerListResponse.forEach((resp) => {
    if (resp.error !== null) {
      console.error("Error when get banner url");
      return [];
    }
  });

  const dataResponse: TMissionResponse[] = data.map((mission, index) => {
    return {
      id: mission.id,
      title: mission.title,
      status: getStatusMission(mission.start_date, mission.end_date),
      bannerURL: bannerListResponse[index].data?.signedUrl || "",
    };
  });

  return dataResponse;
};

export const countTotalMission = async () => {
  const { data, error } = await supabase
    .from("mission")
    .select("id", { count: "exact" })
    .is("deleted_at", null)
    .order("id", { ascending: true });

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

  const [{ data: bannerData, error: fetchBannerError }, { data: tasksData, error: fetchTasksError }] = await Promise.all([
    getBannerPromise,
    getTasksPromise,
  ]);

  if (fetchBannerError !== null || fetchTasksError !== null) {
    console.error("Error fetching data");
    return undefined;
  }

  const bannerURL = bannerData.signedUrl;
  return { ...mission, bannerURL, tasks: tasksData } as TMissionDetailResponse;
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
