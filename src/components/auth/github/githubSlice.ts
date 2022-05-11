import { createSlice } from '@reduxjs/toolkit';
import { createOAuthUserAuth } from '@octokit/auth-app';
import { Octokit } from 'octokit';
import Cookies from 'js-cookie';
import { RootState } from 'src/store';

export interface GithubState {
  githubClient: Octokit | null;
}

const initialState: GithubState = {
  githubClient: null
};

export const githubSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    createClient: (state) => {
      const accessToken = Cookies.get('github_access_token');
      if (accessToken) {
        if (!state.githubClient) {
          state.githubClient = new Octokit({
            authStrategy: createOAuthUserAuth,
            auth: {
              token: accessToken
            }
          });
        }
      } else {
        state.githubClient = null;
      }
    }
  }
});

export const selectGithubClient = (state: RootState) => state.github.githubClient;

export const { createClient } = githubSlice.actions;

export default githubSlice.reducer;
