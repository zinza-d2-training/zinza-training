import { Grid, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods/dist-types/generated/parameters-and-response-types';
import {
  HomeRepositoryTemplateItem,
  HomeRepositoryTemplateItemProps
} from 'src/components/home/HomeRepositoryTemplates/HomeRepositoryTemplateItem';
import { sample } from 'lodash';
import { createGithubAdminClient } from 'src/libs/octokit';

const boxColors = ['#ee6c4d', '#8fbc5d', '#ff9d00', '#626870', '#ab6993', '#4a7aab'];

const githubClient = createGithubAdminClient();

export const HomeRepositoryTemplates = () => {
  const [templateRepositories, setTemplateRepositories] = useState<
    RestEndpointMethodTypes['search']['repos']['response']['data']['items']
  >([]);

  const fetchOrgRepositories = useCallback(async () => {
    const result = await githubClient?.rest.search.repos({
      q: `template in:name org:${process.env.NEXT_PUBLIC_ORG}`
    });
    setTemplateRepositories(result?.data?.items ?? []);
  }, []);

  useEffect(() => {
    fetchOrgRepositories().catch();
  }, [fetchOrgRepositories]);

  const items = useMemo<HomeRepositoryTemplateItemProps[]>(() => {
    return templateRepositories.map((repo) => {
      return {
        repository: repo,
        color: sample(boxColors) ?? ''
      };
    });
  }, [templateRepositories]);

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
