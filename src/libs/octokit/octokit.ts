import { Octokit } from 'octokit';

export const createGithubAdminClient = () => {
  return new Octokit({
    auth: process.env.NEXT_PUBLIC_PERSONAL_ACCESS_TOKEN
  });
};
