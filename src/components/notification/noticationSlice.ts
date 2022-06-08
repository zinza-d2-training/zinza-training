import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppNotificationProps } from 'src/components/notification/AppNotification';
import { v4 } from 'uuid';

export interface NotificationState {
  notifications: { id: string; notification: AppNotificationProps }[];
}

const initialState: NotificationState = {
  notifications: []
};

export const cookieSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (
      state,
      payload: PayloadAction<{ notification: AppNotificationProps; id?: string }>
    ) => {
      state.notifications.push({
        id: payload.payload.id ?? v4(),
        notification: payload.payload.notification
      });
    },
    removeNotification: (state, payload: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== payload.payload
      );
    }
  }
});

export const { addNotification, removeNotification } = cookieSlice.actions;

export default cookieSlice.reducer;
