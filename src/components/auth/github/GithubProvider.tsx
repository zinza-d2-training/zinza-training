import { FC } from 'react';
import { useAppDispatch } from 'src/store';
import { createClient } from 'src/components/auth/github/githubSlice';

export const GithubProvider: FC = (props) => {
  const dispatch = useAppDispatch();
  dispatch(createClient());

  return <>{props.children}</>;
};
