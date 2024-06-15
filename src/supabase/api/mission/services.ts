import { useQuery } from "@tanstack/react-query";
import { countTotalMission, getMission, listMissions } from "./callers";

export const missionKey = {
  missions: "missions",
  mission: "mission",
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

export const useGetMission = (id: number) => {
  return useQuery({
    queryKey: [missionKey.mission, id],
    queryFn: () => getMission(id),
  });
};
