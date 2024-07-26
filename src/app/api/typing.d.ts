type TDiscordCreateThreadRequest = {
  name: string;
  proof: string;
  imageURL: string;
};

type TDiscordCreateClaimXPRequest = {
  username: string;
  missionName: string;
  xp: number;
};

type TDiscordCreateClaimRewardRequest = {
  username: string;
  rewardName: string;
};
