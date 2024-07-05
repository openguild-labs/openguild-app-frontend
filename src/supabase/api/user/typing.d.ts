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
  username?: string;
  twitter?: string;
  discord?: string;
  telegram?: string;
  facebook?: string;
};
