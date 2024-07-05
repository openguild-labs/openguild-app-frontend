type TMissionResponse = {
  id: number;
  title: string;
  status: string;
  statusType: string;
  bannerURL: string;
};

type TMissionDetailResponse = TMissionModel & {
  bannerURL: string;
  tasks: TTaskModel[];
};

type TProofsOfWorkCreation = {
  user_id: number;
  task_id: number;
  link?: string;
  image?: string;
};
