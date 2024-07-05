import { useMutation, useQuery } from "@tanstack/react-query";
import {
  completeTask,
  countTotalMission,
  createProofsOfWork,
  getCompletedTasks,
  getMission,
  listMissions,
  listMissionsCategories,
} from "./callers";

export const missionKey = {
  missions: "missions",
  mission: "mission",
  completedTasks: "completedTasks",
  missionCategory: "missionCategory",
};

export const useListMission = (page: number, search: string, missionType: string, categoryID: string) => {
  return useQuery({
    queryKey: [missionKey.missions, page, search, missionType, categoryID],
    queryFn: () => listMissions(page, search, missionType, categoryID),
  });
};

export const useCountTotalMission = (search: string, missionType: string, categoryID: string) => {
  return useQuery({
    queryKey: [missionKey.missions, search, missionType, categoryID],
    queryFn: () => countTotalMission(search, missionType, categoryID),
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

export const useListMissionCategory = () => {
  return useQuery({
    queryKey: [missionKey.missionCategory],
    queryFn: () => listMissionsCategories(),
  });
};
