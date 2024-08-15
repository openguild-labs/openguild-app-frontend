import { ENDING_STATUS, MISSION_STATUS__TYPE } from "@/constants/mission";
import { supabase } from "@/supabase";

const coutDownTimeUnit = (start: Date, end: Date) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const countdownDay = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const countdownHour = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60)) - countdownDay * 24;
  const countdownMinute = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60)) - countdownDay * 24 * 60 - countdownHour * 60;
  return [countdownDay, countdownHour, countdownMinute];
};

export const getStatusMission = (start_date: string, end_date: string) => {
  const now = new Date();
  const end = new Date(end_date);
  const start = new Date(start_date);

  if (start > now) {
    const [countdownDay, countdownHour, countdownMinute] = coutDownTimeUnit(now, start);
    return `Starts in|${countdownDay}d ${countdownHour}h ${countdownMinute}m`;
  }

  if (start <= now && end > now) {
    const [countdownDay, countdownHour, countdownMinute] = coutDownTimeUnit(now, end);
    return `Ends in|${countdownDay}d ${countdownHour}h ${countdownMinute}m`;
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
