type TMissionResponse = {
  id: number;
  title: string;
  status: string;
  statusType: string;
  bannerURL: string;
  category: string;
  xp: number;
};

type TMissionDetailResponse = TMissionModel & {
  bannerURL: string;
  participants: number;
  tasks: TTaskModel[];
};

type TProofsOfWorkCreation = {
  user_id: number;
  task_id: number;
  proof: string;
  file: File | null;
};

type TParticipantQuantityView = {
  mission_id: number;
  quantity: number;
};

type TMissionSubInfoView = {
  mission_id: number;
  category: string;
  total_xp: number;
};
