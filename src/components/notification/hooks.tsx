import { AppNotificationProps } from 'src/components/notification/AppNotification';
import { useAppDispatch } from 'src/store';
import { useCallback } from 'react';
import { addNotification, removeNotification } from 'src/components/notification/noticationSlice';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { v4 } from 'uuid';

type NotifyHookNotificationProps = Omit<AppNotificationProps, 'content'> & { content?: string };

export interface NotifyHookResults {
  notify: (props?: NotifyHookNotificationProps) => void;
  notifyError: (props?: NotifyHookNotificationProps) => void;
}

export const useNotify = () => {
  const dispatch = useAppDispatch();

  const notify = useCallback<NotifyHookResults['notify']>(
    (props) => {
      const id = v4();
      dispatch(
        addNotification({
          id,
          notification: {
            content: 'Ok!',
            action: (
              <IconButton size="small" onClick={() => dispatch(removeNotification(id))}>
                <CloseIcon />
              </IconButton>
            ),
            ...props
          }
        })
      );
    },
    [dispatch]
  );

  const notifyError = useCallback<NotifyHookResults['notifyError']>(
    (props) => {
      dispatch(
        addNotification({
          notification: { content: 'Something went wrong!', severity: 'error', ...props }
        })
      );
    },
    [dispatch]
  );

  return {
    notify,
    notifyError
  };
};
