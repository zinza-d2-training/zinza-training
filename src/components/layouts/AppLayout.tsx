import { FC } from 'react';
import { Box } from '@mui/system';
import { Header } from '../header/Header';

export const AppLayout: FC = ({ children }) => {
  return (
    <Box>
      <Header />
      <Box mt="60px">{children}</Box>
    </Box>
  );
};
