import { useAppSelector } from 'src/store';
import { Stack } from '@mui/material';
import { AppNotification } from 'src/components/notification/AppNotification';

export const NotificationGroup = () => {
  const notifications = useAppSelector((state) => state.notification.notifications);
  return (
    <>
      {!!notifications.length && (
        <Stack
          spacing={3}
          position="fixed"
          top={0}
          right={0}
          height="100vh"
          pb={5}
          pr={5}
          width={300}
          justifyContent="flex-end"
          sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
          {notifications.map((notification) => (
            <AppNotification
              {...notification.notification}
              notificationId={notification.id}
              key={notification.id}
            />
          ))}
        </Stack>
      )}
    </>
  );
};
