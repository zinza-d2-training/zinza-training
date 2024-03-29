import { Box, Grid, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import {
  HomeRepositoryTemplateItem,
  HomeRepositoryTemplateItemProps
} from 'src/components/home/HomeRepositoryTemplates/HomeRepositoryTemplateItem';
import sample from 'lodash/sample';
import { useRepositoryTemplatesQuery } from 'src/api/repositories/templates';

const boxColors = ['#ee6c4d', '#8fbc5d', '#ff9d00', '#626870', '#ab6993', '#4a7aab'];

export const HomeRepositoryTemplates = () => {
  const { data: templateRepositoriesData } = useRepositoryTemplatesQuery();

  const items = useMemo<HomeRepositoryTemplateItemProps[]>(() => {
    return (
      templateRepositoriesData?.data?.map((repo) => {
        return {
          repository: repo,
          color: sample(boxColors) ?? ''
        };
      }) ?? []
    );
  }, [templateRepositoriesData?.data]);

  return (
    <Stack
      flexDirection="column"
      alignItems="center"
      width={1}
      p={8}
      sx={(theme) => ({
        background: '#f2f3f8',
        px: 3,
        [theme.breakpoints.up('sm')]: {
          px: 8
        }
      })}>
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
