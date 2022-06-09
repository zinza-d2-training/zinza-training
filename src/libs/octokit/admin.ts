import { Octokit } from 'octokit';

export const createGithubAdminClient = () => {
  return new Octokit({
    auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN
  });
};
