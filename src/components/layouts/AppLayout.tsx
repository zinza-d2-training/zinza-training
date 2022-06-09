import { FC } from 'react';
import { Box } from '@mui/material';
import { Header } from '../header/Header';
import { NotificationGroup } from 'src/components/notification/NotificationGroup';

export const AppLayout: FC = ({ children }) => {
  return (
    <Box>
      <Header />
      <Box mt="60px">{children}</Box>
      <NotificationGroup />
    </Box>
  );
};
