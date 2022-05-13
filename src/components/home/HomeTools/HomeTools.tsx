import { Grid, Stack } from '@mui/material';
import { Box } from '@mui/system';
import GenerateIcon from 'src/assets/svg/svgexport-24.svg';
import ReGenerateIcon from 'src/assets/svg/svgexport-18.svg';
import ProtectIcon from 'src/assets/svg/svgexport-20.svg';
import ArchiveIcon from 'src/assets/svg/svgexport-6.svg';
import ExportIcon from 'src/assets/svg/svgexport-17.svg';
import TemplateIcon from 'src/assets/svg/svgexport-14.svg';
import { HomeToolItem, HomeToolItemProps } from './HomeToolItem';
import { useAppDispatch, useAppSelector } from 'src/store';
import { increment } from '../homeSlice';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods/dist-types/generated/parameters-and-response-types';

const tools: HomeToolItemProps[] = [
  {
    title: 'Create repository',
    description:
      'Create a repository from a template you want, include issues, milestones, projects, labels',
    icon: GenerateIcon
  },
  {
    title: 'Regenerate repository',
    description: 'Repair a damaged repository and recover issues, milestones, projects, labels',
    icon: ReGenerateIcon
  },
  {
    title: 'Protect repository',
    description: 'Protect repository with a security workflow to prevent unauthorized access.',
    icon: ProtectIcon
  },
  {
    title: 'Archive repository',
    description: 'Archive repository to prevent editing',
    icon: ArchiveIcon
  },
  {
    title: 'Export repository',
    description:
      'Pull data straight from repositories into Excel spreadsheets in a few short seconds for reporting.',
    icon: ExportIcon
  }
];

export const HomeTools = () => {
  const [templateRepositories, setTemplateRepositories] = useState<
    RestEndpointMethodTypes['search']['repos']['response']['data']['items']
  >([]);

  const items = useMemo<HomeToolItemProps[]>(() => {
    return [
      ...tools,
      ...templateRepositories.map((repo) => ({
        title: repo.name,
        description: repo.description ?? '',
        icon: TemplateIcon,
        repository: {
          name: repo.name,
          default_branch: repo.default_branch
        }
      }))
    ];
  }, [templateRepositories]);

  const dispatch = useAppDispatch();

  const githubClient = useAppSelector((state) => state.github.githubClient);

  const fetchOrgRepositories = useCallback(async () => {
    const result = await githubClient?.rest.search.repos({
      q: `template in:name org:${process.env.NEXT_PUBLIC_ORG}`
    });
    setTemplateRepositories(result?.data?.items ?? []);
  }, [githubClient?.rest.search]);

  useEffect(() => {
    fetchOrgRepositories().catch();
  }, [fetchOrgRepositories]);

  const handleClick = () => {
    dispatch(increment());
  };

  return (
    <Stack
      flexDirection="column"
      alignItems="center"
      width={1}
      pb={7}
      px={8}
      sx={{
        background: 'rgb(243, 240, 236)'
      }}>
      <Box width={1} sx={{ background: 'white' }} mt={-10}>
        <Grid container>
          {items.map((item) => (
            <Grid item lg={2} md={3} sm={4} key={item.title}>
              <HomeToolItem {...item} onClick={handleClick} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
};
