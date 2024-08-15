type TRewardResponse = TRewardModel & {
  imageURL: string;
};

type TRequirementResponse = {
  id: number;
  title: string;
  bannerURL: string;
  isCompleted: boolean;
};

type TRewardDetailsResponse = TRewardResponse & {
  requirements: TRequirementResponse[];
};

type TMissionTasks = TMissionModel & {
  tasks: TTaskModel[];
};

type TCompletedMissionResponse = {
  id: number;
  user_id: number;
  mission_id: number;
  is_completed: boolean;
};
