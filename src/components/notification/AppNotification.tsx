import { Alert, AlertProps, Snackbar } from '@mui/material';
import { SyntheticEvent, useCallback } from 'react';
import { useAppDispatch } from 'src/store';
import { removeNotification } from 'src/components/notification/noticationSlice';

export interface AppNotificationProps extends Omit<AlertProps, 'sx' | 'ref' | 'defaultValue'> {
  content: string;
}

interface Props extends AppNotificationProps {
  notificationId: string;
}

export const AppNotification = ({ content, notificationId, ...props }: Props) => {
  const dispatch = useAppDispatch();

  const handleClose = useCallback(
    (event?: SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }

      dispatch(removeNotification(notificationId));
    },
    [dispatch, notificationId]
  );

  return (
    <Snackbar open={true} autoHideDuration={3000} onClose={handleClose}>
      <Alert {...props} onClose={handleClose} sx={{ width: '100%' }}>
        {content}
      </Alert>
    </Snackbar>
  );
};
