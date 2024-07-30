type TDiscordCreateThreadRequest = {
  name: string;
  proof: string;
  imageURL: string;
};

type TDiscordCreateClaimXPRequest = {
  userID: string;
  missionName: string;
  xp: number;
};

type TDiscordCreateClaimRewardRequest = {
  userID: string;
  rewardName: string;
};

type TDiscordSearchMember = {
  username: string;
};

type TDiscordMemberResponse = {
  avatar: any;
  banner: any;
  communication_disabled_until: any;
  flags: number;
  joined_at: string;
  nick: any;
  pending: boolean;
  premium_since: any;
  roles: any[];
  unusual_dm_activity_until: any;
  user: TSearchDiscordMemberInfo;
  mute: boolean;
  deaf: boolean;
};

type TSearchDiscordMemberInfo = {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  public_flags: number;
  flags: number;
  banner: any;
  accent_color: any;
  global_name: string;
  avatar_decoration_data: any;
};

type TLimitErrorMessage = {
  message: string;
  retry_after: boolean;
};
