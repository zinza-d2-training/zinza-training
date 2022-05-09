import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from 'src/components/home/homeSlice';

export const store = configureStore({
  reducer: {
    home: counterReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
