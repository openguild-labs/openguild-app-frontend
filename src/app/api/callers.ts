export const sendPoW = async (req: TDiscordCreateThreadRequest) => {
  return fetch("/api/pow", {
    method: "POST",
    body: JSON.stringify(req),
  });
};

export const sendClaimXPRequest = async (req: TDiscordCreateClaimXPRequest) => {
  return fetch("/api/claim/xp", {
    method: "POST",
    body: JSON.stringify(req),
  });
};

export const sendClaimRewardRequest = async (req: TDiscordCreateClaimRewardRequest) => {
  return fetch("/api/claim/reward", {
    method: "POST",
    body: JSON.stringify(req),
  });
};

export const searchDiscordMember = async (username: string) => {
  if (username === "") {
    return [];
  }

  const data = await fetch("/api/members/search?query=" + username, {
    method: "GET",
  });

  const res = await data.json();
  return res.data as TDiscordMemberResponse[];
};

const listDiscordMembers = async (after: string) => {
  const data = await fetch("/api/members?after=" + after, {
    method: "GET",
  });
  const res = await data.json();
  return res.data as TDiscordMemberResponse[];
};

export const findDiscordMemberFromList = async (username: string) => {
  let stop = false;
  let user: TDiscordMemberResponse | undefined = undefined;
  let lastUserID = "";
  while (!stop) {
    const data = await listDiscordMembers(lastUserID);
    if (data.length === 0) {
      stop = true;
    } else {
      user = data.find((u) => u.user.username === username);
      if (user !== undefined) {
        stop = true;
      }
      lastUserID = data[data.length - 1].user.id;
    }
  }

  return user;
};
