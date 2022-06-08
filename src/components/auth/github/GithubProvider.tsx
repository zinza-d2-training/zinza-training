import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store';
import { setGithubAccessToken } from 'src/components/auth/github/githubSlice';
import Cookies from 'js-cookie';

export const GithubProvider: FC = (props) => {
  const githubAccessToken =
    useAppSelector((state) => state.cookie.cookie).github_access_token ??
    Cookies.get('github_access_token') ??
    null;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setGithubAccessToken(githubAccessToken));
  }, [dispatch, githubAccessToken]);

  return <>{props.children}</>;
};
