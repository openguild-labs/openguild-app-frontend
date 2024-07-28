type TError = {
  message: string;
};

type TMissionModel = {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  created_at: string;
  banner: string; // banner path
  mission_category_id: string;
};

type TTaskModel = {
  id: number;
  name: string;
  type: string;
  xp: number;
  description: string;
  action: string;
  button_placeholder: string;
};

type TCompletedTaskModel = {
  id: number;
  user_id: number;
  task_id: number;
};

type TUserModel = {
  id: number;
  email: string;
  wallet_address: string;
  first_name: string;
  last_name: string;
  is_student: boolean;
  username?: string;
  twitter?: string;
  discord?: string;
  telegram?: string;
  discord_id?: string;
};

type TMissionCategoryModel = {
  id: number;
  name: string;
  description: string;
};

type TRewardModel = {
  id: number;
  name: string;
  description: string;
  quantity: number;
  type: string;
  requirements: string;
  image: string;
  created_at: string;
};

type TClaimRequestModel = {
  id: number;
  user_id: number;
  object_id: number;
  type: string;
};
