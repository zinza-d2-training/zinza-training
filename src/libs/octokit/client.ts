import { useAppSelector } from 'src/store';
import { useMemo } from 'react';
import { createOAuthUserAuth } from '@octokit/auth-app';
import { request } from '@octokit/request';

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
