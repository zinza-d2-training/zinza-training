import { Grid, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useMemo } from 'react';
import {
  HomeRepositoryTemplateItem,
  HomeRepositoryTemplateItemProps
} from 'src/components/home/HomeRepositoryTemplates/HomeRepositoryTemplateItem';
import { sample } from 'lodash';
import { createGithubAdminClient } from 'src/libs/octokit';
import { useRepositoryTemplatesQuery } from 'src/api/repositories/templates';

const boxColors = ['#ee6c4d', '#8fbc5d', '#ff9d00', '#626870', '#ab6993', '#4a7aab'];

const githubClient = createGithubAdminClient();

export const HomeRepositoryTemplates = () => {
  const { data: templateRepositoriesData } = useRepositoryTemplatesQuery();

  const items = useMemo<HomeRepositoryTemplateItemProps[]>(() => {
    return (
      templateRepositoriesData?.data?.data?.map((repo) => {
        return {
          repository: repo,
          color: sample(boxColors) ?? ''
        };
      }) ?? []
    );
  }, [templateRepositoriesData?.data?.data]);

  return (
    <Stack
      flexDirection="column"
      alignItems="center"
      width={1}
      p={8}
      sx={{
        background: '#f2f3f8'
      }}>
      <Box width={1}>
        <Typography variant="h2" sx={{ fontWeight: 500, fontSize: 32 }} align="center">
          Start building solutions that generate, sync training repositories
        </Typography>
      </Box>
      <Box width={1} sx={{ maxWidth: '1100px' }} mt={8}>
        <Grid container spacing={4}>
          {items.map((item) => (
            <Grid item sm={4} xs={12} key={item.repository.name}>
              <HomeRepositoryTemplateItem {...item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
};
