import { buildCachePayload, getRevalidatedJsonData, storeJsonCacheData } from '../../cacheUtils';
import { GitHubRepository } from '../models';
import { fetchRepositories } from './api';

const CACHE_EXPIRATION_MS = (60 + 30) * 60 * 1000; // 1 hour 30 minutes

async function getRevalidatedRepositoryNames(repositoryOwner: string) {
  let isRevalidated = false;
  const repositoriesNames = await getRevalidatedJsonData<string[]>(repositoryOwner, async () => {
    const repositories = await fetchRepositories(repositoryOwner);
    const repoIds = repositories.map(repo => repo.name);
    isRevalidated = true;
    return buildCachePayload(repoIds, CACHE_EXPIRATION_MS);
  });

  return {
    repositoriesNames: repositoriesNames || [],
    isRevalidated,
  };
}

export async function fetchOptimizedRepositories(
  repositoryOwner: string
): Promise<GitHubRepository[]> {
  const buildRespositoryKey = (repositoryName: string) => `${repositoryOwner}/${repositoryName}`;

  const { repositoriesNames: cachedRepositoryNames, isRevalidated } =
    await getRevalidatedRepositoryNames(repositoryOwner);

  // If the cache is expired (isRevalidated) force the branch to `not cached` case
  if (cachedRepositoryNames.length > 0 && !isRevalidated) {
    // repositories are cached
    const repositories: GitHubRepository[] = [];
    for (const repositoryName of cachedRepositoryNames) {
      const repository = await getRevalidatedJsonData<GitHubRepository>(
        buildRespositoryKey(repositoryName)
      );
      if (repository) repositories.push(repository);
    }
    return repositories;
  } else {
    // not cached yet, must fetch from remote
    const repositories = await fetchRepositories(repositoryOwner);
    for (const repository of repositories) {
      storeJsonCacheData<GitHubRepository>(
        buildRespositoryKey(repository.name),
        buildCachePayload(repository, CACHE_EXPIRATION_MS)
      );
    }
    const repositoryNames = repositories.map(repo => repo.name.toString());
    storeJsonCacheData<string[]>(
      repositoryOwner,
      buildCachePayload(repositoryNames, CACHE_EXPIRATION_MS)
    );
    return repositories;
  }
}
