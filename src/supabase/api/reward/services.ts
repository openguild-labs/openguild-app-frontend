import { useQuery } from "@tanstack/react-query";
import { countTotalRewards, listRewards } from "./callers";

export const rewardKey = {
  rewards: "rewards",
};

export const useListReward = (page: number, search: string, categoryID: string) => {
  return useQuery({
    queryKey: [rewardKey.rewards, page, search, categoryID],
    queryFn: () => listRewards(page, search, categoryID),
  });
};

export const useCountTotalReward = (search: string, categoryID: string) => {
  return useQuery({
    queryKey: [rewardKey.rewards, search, categoryID],
    queryFn: () => countTotalRewards(search, categoryID),
  });
};
