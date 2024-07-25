import QuestContainer from "../QuestContainer";
import { GitHubRepository } from "@/utils/github/models";
const MIDDLE_STYLE = {
  justifyContent: "center",
  display: "flex",
  alignItems: "center",
};

interface Props {
  containerRepositories: GitHubRepository[];
  containerTitle: string;
  containerDescription?: string;
  questOwner?: string;
}

export default function QuestListContainer({ containerRepositories, containerTitle, containerDescription, questOwner }: Props) {
  return (
    <div className="max-w-[900px] mx-auto">
      <div className="border-b border-gray-300 pb-4">
        <h1 className="font-medium text-xl text-black pb-2 mt-8">{containerTitle}</h1>
        <p className="text-gray-500">{containerDescription}</p>
      </div>
      <div style={{ ...MIDDLE_STYLE, justifyContent: "center", flexDirection: "column" }}>
        {containerRepositories
          .filter((repository) => repository.open_issues_count > 0)
          .sort((repositoryA, repositoryB) => repositoryB.open_issues_count - repositoryA.open_issues_count)
          .map((repository) => (
            <QuestContainer questOwner={questOwner} repository={repository} />
          ))}
      </div>
    </div>
  );
}
