import { useMutation, useQuery } from "@tanstack/react-query";
import { completeTask, countTotalMission, getCompletedTasks, getMission, listMissions } from "./callers";

export const missionKey = {
  missions: "missions",
  mission: "mission",
  completedTasks: "completedTasks",
};

export const useListMission = (page: number) => {
  return useQuery({
    queryKey: [missionKey.missions, page],
    queryFn: () => listMissions(page),
  });
};

export const useCountTotalMission = () => {
  return useQuery({
    queryKey: [missionKey.missions],
    queryFn: () => countTotalMission(),
  });
};

export const useGetMission = (id: string) => {
  return useQuery({
    queryKey: [missionKey.mission, id],
    queryFn: () => getMission(id),
  });
};

export const useGetCompletedTasks = (userID: number, taskIDs: number[]) => {
  return useQuery({
    queryKey: [missionKey.completedTasks, userID, ...taskIDs],
    queryFn: () => getCompletedTasks(userID, taskIDs),
  });
};

export const useCompleteTask = (userID: number) => {
  return useMutation({
    mutationFn: (taskID: number) => completeTask(userID, taskID),
  });
};
