import { FC, useEffect } from 'react';
import { useAppDispatch } from 'src/store';
import { createGithubClient, setGithubAccessToken } from 'src/components/auth/github/githubSlice';
import Cookies from 'js-cookie';

export const GithubProvider: FC = (props) => {
  const accessTokenFromCookies = Cookies.get('github_access_token') ?? null;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setGithubAccessToken(accessTokenFromCookies));
    dispatch(createGithubClient());
  }, [dispatch, accessTokenFromCookies]);

  return <>{props.children}</>;
};
