import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GithubState {
  githubAccessToken: string | null;
}

const initialState: GithubState = {
  githubAccessToken: null
};

export const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    setGithubAccessToken: (state, payload: PayloadAction<string | null>) => {
      state.githubAccessToken = payload.payload;
    }
  }
});

export const { setGithubAccessToken } = githubSlice.actions;

export default githubSlice.reducer;
