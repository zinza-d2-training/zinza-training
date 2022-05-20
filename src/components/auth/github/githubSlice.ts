import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createOAuthUserAuth } from '@octokit/auth-app';
import { Octokit } from 'octokit';

export interface GithubState {
  githubClient: Octokit | null;
  githubAccessToken: string | null;
}

const initialState: GithubState = {
  githubClient: null,
  githubAccessToken: null
};

export const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    createGithubClient: (state) => {
      if (state.githubAccessToken) {
        return {
          ...state,
          githubClient: new Octokit({
            authStrategy: createOAuthUserAuth,
            auth: {
              token: state.githubAccessToken
            }
          })
        };
      } else {
        return state;
      }
    },
    setGithubAccessToken: (state, payload: PayloadAction<string | null>) => {
      state.githubAccessToken = payload.payload;
    }
  }
});

export const { createGithubClient, setGithubAccessToken } = githubSlice.actions;

export default githubSlice.reducer;
