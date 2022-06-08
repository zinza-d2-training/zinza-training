import { Octokit } from 'octokit';
import { useAppSelector } from 'src/store';
import { createOAuthUserAuth } from '@octokit/auth-app';
import { request } from '@octokit/request';
import { useMemo } from 'react';

export const createGithubAdminClient = () => {
  return new Octokit({
    auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN
  });
};

export const useOctokitRequest = () => {
  const githubAccessToken = useAppSelector((state) => state.github.githubAccessToken);
  return useMemo(() => {
    const auth = createOAuthUserAuth({
      token: githubAccessToken ?? '',
      clientId: '',
      clientSecret: ''
    });
    const requestWithAuth = request.defaults({
      request: {
        hook: auth.hook
      },
      mediaType: {
        previews: ['machine-man']
      }
    });

    return { requestWithAuth };
  }, [githubAccessToken]);
};
