import React from "react";
import GithubAvatarList from "../GithubAvatarList";
import { GithubUser } from "@/utils/github/models";
import { useHydration } from "../../hooks";

const QuestCardContributorAvatar = ({ assignees }: { assignees: GithubUser[] }) => {
  const hydrated = useHydration();
  return <div>{hydrated && assignees.length > 0 ? <GithubAvatarList users={assignees} /> : <h1 className="text-slate-400">N/A</h1>}</div>;
};

export default QuestCardContributorAvatar;
