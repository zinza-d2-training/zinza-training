import { FC, useEffect } from 'react';
import { useAppDispatch } from 'src/store';
import { createClient, setGithubAccessToken } from 'src/components/auth/github/githubSlice';
import Cookies from 'js-cookie';

export const GithubProvider: FC = (props) => {
  const accessTokenFromCookies = Cookies.get('github_access_token') ?? null;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setGithubAccessToken(accessTokenFromCookies));
    dispatch(createClient());
  }, [dispatch, accessTokenFromCookies]);

  return <>{props.children}</>;
};
