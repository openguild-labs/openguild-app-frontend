import { useMutation, useQuery } from "@tanstack/react-query";
import { completeTask, countTotalMission, createProofsOfWork, getCompletedTasks, getMission, listMissions } from "./callers";

export const missionKey = {
  missions: "missions",
  mission: "mission",
  completedTasks: "completedTasks",
};

export const useListMission = (page: number, search: string) => {
  return useQuery({
    queryKey: [missionKey.missions, page, search],
    queryFn: () => listMissions(page, search),
  });
};

export const useCountTotalMission = (search: string) => {
  return useQuery({
    queryKey: [missionKey.missions, search],
    queryFn: () => countTotalMission(search),
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

export const useCreateProofsOfWork = () => {
  return useMutation({
    mutationFn: (creation: TProofsOfWorkCreation) => createProofsOfWork(creation),
  });
};
