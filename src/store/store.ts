import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from 'src/components/home/homeSlice';
import githubReducer from 'src/components/auth/github/githubSlice';
import cookieReducer from 'src/components/cookie/cookieSlice';

export const store = configureStore({
  reducer: {
    home: counterReducer,
    github: githubReducer,
    cookie: cookieReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
