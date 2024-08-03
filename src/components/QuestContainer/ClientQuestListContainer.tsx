"use client";
import { fetchOptimizedRepositories } from "@/utils/github/services/cacheApi";
import React, { useEffect, useState } from "react";
import QuestListContainer from "../QuestListContainer";
import { GitHubRepository } from "@/utils/github/models";

type Props = {
  containerTitle: string;
  containerDescription: string;
  organizationName: string;
  organizationRepositories?: string[];
};

const ClientQuestListContainer = ({ organizationName, containerTitle, containerDescription, organizationRepositories }: Props) => {
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  useEffect(() => {
    const init = async () => {
      const _repositories = await fetchOptimizedRepositories(organizationName);
      setRepositories(_repositories.filter((repo) => (organizationRepositories ? organizationRepositories.includes(repo.name) : true)));
    };
    init();
  }, [organizationName]);
  return (
    <QuestListContainer containerTitle={containerTitle} containerDescription={containerDescription} containerRepositories={repositories} />
  );
};

export default ClientQuestListContainer;
