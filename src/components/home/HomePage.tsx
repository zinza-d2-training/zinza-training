import { Box } from '@mui/material';
import { HomeRepositoryTemplates } from './HomeRepositoryTemplates/HomeRepositoryTemplates';
import { HomeTitle } from './HomeTitle';
import { HomeTools } from './HomeTools/HomeTools';

export const HomePage = () => {
  return (
    <Box>
      <HomeTitle />
      <HomeTools />
      <HomeRepositoryTemplates />
    </Box>
  );
};
