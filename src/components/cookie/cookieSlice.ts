import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { parse } from 'cookie';

export interface CookieState {
  cookie: Record<string, any>;
}

const initialState: CookieState = {
  cookie: {}
};

export const cookieSlice = createSlice({
  name: 'cookie',
  initialState,
  reducers: {
    setCookie: (state, payload: PayloadAction<string | null | undefined>) => {
      if (payload.payload) {
        state.cookie = parse(payload.payload);
      }
    }
  }
});

export const { setCookie } = cookieSlice.actions;

export default cookieSlice.reducer;
