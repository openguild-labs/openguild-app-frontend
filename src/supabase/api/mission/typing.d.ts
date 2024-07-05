type TMissionResponse = {
  id: number;
  title: string;
  status: string;
  statusType: string;
  bannerURL: string;
  category: string;
};

type TMissionDetailResponse = TMissionModel & {
  bannerURL: string;
  participants: number;
  tasks: TTaskModel[];
};

type TProofsOfWorkCreation = {
  user_id: number;
  task_id: number;
  link?: string;
  image?: string;
};

type TParticipantQuantityResponse = {
  mission_id: number;
  quantity: number;
};
