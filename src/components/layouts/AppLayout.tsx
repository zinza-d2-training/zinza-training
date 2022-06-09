import { FC } from 'react';
import { Box } from '@mui/material';
import { Header } from '../header/Header';
import dynamic from 'next/dynamic';

const NotificationGroup = dynamic<{}>(() =>
  import('src/components/notification/NotificationGroup').then((comp) => comp.NotificationGroup)
);

export const AppLayout: FC = ({ children }) => {
  return (
    <Box>
      <Header />
      <Box mt="60px">{children}</Box>
      <NotificationGroup />
    </Box>
  );
};
