type TUserCreation = {
  email?: string;
  wallet_address: string;
  first_name?: string;
  last_name?: string;
};

type TUserUpdate = {
  email?: string;
  first_name?: string;
  last_name?: string;
};

type TUserModel = {
  id: number;
  email: string;
  wallet_address: string;
  first_name: string;
  last_name: string;
  is_student: boolean;
};
