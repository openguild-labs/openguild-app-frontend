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
  description: string;
  action: string;
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
};

type TMissionCategoryModel = {
  id: number;
  name: string;
  description: string;
};
