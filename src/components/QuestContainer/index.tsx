"use client";
import React, { useEffect, useState } from "react";
import QuestCategoriesSection from "../QuestCategoriesSection";
import QuestCardList from "../QuestCardList";
import { fetchRepositoryIssues } from "@/utils/github/services/api";
import { GitHubRepository, GithubLabel, GithubRepositoryIssue } from "@/utils/github/models";
import LoadableContainer from "../LoadableContainer";
import { Skeleton } from "antd";
import { countExistentialObject } from "@/utils/objectUtils";
import { GithubFilled } from "@ant-design/icons";

type Props = {
  repository: GitHubRepository;
  questOwner?: string;
};

const collectUniqueCategories = (repositoryIssues: GithubRepositoryIssue[]) => {
  const uniqueCategories: GithubLabel[] = [];
  const categoriesCount: Record<string, number> = {};
  for (const repositoryIssue of repositoryIssues) {
    for (const label of repositoryIssue.labels) {
      if (!categoriesCount[label.id]) uniqueCategories.push(label);
      categoriesCount[label.id] = (categoriesCount[label.id] || 0) + 1;
    }
  }
  return { uniqueCategories, categoriesCount };
};

const QuestContainer = ({ repository, questOwner }: Props) => {
  const [repositoryIssues, setRepositoryIssues] = useState<GithubRepositoryIssue[]>([]);
  const [categories, setCategories] = useState<GithubLabel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const fetchedRepositoryIssues = await fetchRepositoryIssues(repository.owner.login, repository.name);
        const repositoryIssues = questOwner
          ? fetchedRepositoryIssues.filter((issue) => issue.assignees.map((assignee) => assignee.login).includes(questOwner))
          : fetchedRepositoryIssues;
        setRepositoryIssues(repositoryIssues);

        const globalCategories = collectUniqueCategories(repositoryIssues);
        const renderedCategories = globalCategories.uniqueCategories.map((category) => ({
          ...category,
          name: `${category.name} (${globalCategories.categoriesCount[category.id]})`,
        }));
        setCategories(renderedCategories);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    init();
  }, [repository]);

  return (
    <LoadableContainer isLoading={repositoryIssues.length === 0} loadComponent={<></>}>
      <div className="border border-gray-300 p-7 my-5 bg-white " style={{ width: "100%" }}>
        <div className="border-b border-gray-300 pb-4">
          <h1 className="font-medium text-md text-black pb-2">
            {repository.name}{" "}
            <GithubFilled
              className="text-black"
              style={{ cursor: "pointer" }}
              onClick={() => window.open(`https://github.com/${repository.owner.login}/${repository.name}`)}
            />
          </h1>
          <p className="text-gray-500">{repository.description}</p>
        </div>
        <LoadableContainer isLoading={loading} loadComponent={<Skeleton />}>
          <QuestCategoriesSection categories={categories}>
            {(selectedCategories) => (
              <div key={JSON.stringify(selectedCategories)} className="mt-5">
                {countExistentialObject(selectedCategories) > 0 ? (
                  <QuestCardList issues={repositoryIssues.filter((issue) => issue.labels.some((label) => selectedCategories[label.id]))} />
                ) : (
                  <QuestCardList issues={repositoryIssues} />
                )}
              </div>
            )}
          </QuestCategoriesSection>
        </LoadableContainer>
      </div>
    </LoadableContainer>
  );
};

export default QuestContainer;
