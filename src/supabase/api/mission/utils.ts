import { ENDING_STATUS, MISSION_STATUS__TYPE } from "@/constants/mission";
import { supabase } from "@/supabase";

export const getStatusMission = (start_date: string, end_date: string) => {
  const now = new Date();
  const end = new Date(end_date);
  const start = new Date(start_date);

  if (start > now) {
    return `Starts in|${start.getDate() - now.getDate()}d ${Math.abs(start.getHours() - now.getHours())}h ${Math.abs(
      start.getMinutes() - now.getMinutes()
    )}m`;
  }

  if (start <= now && end > now) {
    return `Ends in|${end.getDate() - now.getDate()}d ${Math.abs(end.getHours() - now.getHours())}h ${Math.abs(
      end.getMinutes() - now.getMinutes()
    )}m`;
  }

  if (end <= now) {
    return ENDING_STATUS;
  }

  return "--";
};
export const getStatusTypeMission = (start_date: string, end_date: string) => {
  const now = new Date();
  const end = new Date(end_date);
  const start = new Date(start_date);

  if (start > now) {
    return MISSION_STATUS__TYPE.NOT_START;
  }

  if (start <= now && end > now) {
    return MISSION_STATUS__TYPE.IN_PROGRESS;
  }

  return MISSION_STATUS__TYPE.ENDED;
};

export const uploadPoWImage = async (userID: number, taskID: number, file: File) => {
  const { data, error } = await supabase.storage.from("proofs_of_work").upload(`${userID}/${taskID}/${file.name}`, file);
  if (error !== null) {
    return "";
  }

  return data.path;
};
