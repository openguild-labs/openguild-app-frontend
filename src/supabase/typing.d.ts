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
};

type TTaskModel = {
  id: number;
  name: string;
  type: string;
  description: string;
  action: string;
};
