export type GitHubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
};

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
    {
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/vnd.github+json",
      },
    },
  );

  if (!response.ok) {
    return [];
  }

  const repos = (await response.json()) as (GitHubRepo & { fork?: boolean })[];
  return repos.filter((repo) => !repo.fork);
}

export async function fetchPinnedRepos(username: string): Promise<GitHubRepo[]> {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    next: { revalidate: 3600 },
    headers: {
      "Content-Type": "application/json",
      Accept: "application/vnd.github+json",
    },
    body: JSON.stringify({
      query: `
        query($username: String!) {
          user(login: $username) {
            pinnedItems(first: 6, types: REPOSITORY) {
              nodes {
                ... on Repository {
                  name
                  description
                  url
                  primaryLanguage { name }
                  stargazerCount
                  updatedAt
                }
              }
            }
          }
        }
      `,
      variables: { username },
    }),
  });

  if (!response.ok) {
    return fetchGitHubRepos(username);
  }

  const json = (await response.json()) as {
    data?: {
      user?: {
        pinnedItems?: {
          nodes?: Array<{
            name: string;
            description: string | null;
            url: string;
            primaryLanguage: { name: string } | null;
            stargazerCount: number;
            updatedAt: string;
          }>;
        };
      };
    };
  };

  const nodes = json.data?.user?.pinnedItems?.nodes ?? [];
  if (nodes.length === 0) {
    return fetchGitHubRepos(username);
  }

  return nodes.map((node) => ({
    name: node.name,
    description: node.description,
    html_url: node.url,
    language: node.primaryLanguage?.name ?? null,
    stargazers_count: node.stargazerCount,
    updated_at: node.updatedAt,
  }));
}
