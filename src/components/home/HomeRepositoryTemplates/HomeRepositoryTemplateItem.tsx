import {
  CircularProgress,
  Icon,
  IconButton,
  Link,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import Image from 'next/image';
import { Box, BoxProps } from '@mui/system';
import { useCallback, useEffect, useState } from 'react';
import {
  RepositoryTemplateConfig,
  validateRepositoryTemplateConfig
} from 'src/components/Parsers/TemplateConfigParser';
import { githubRawContentUrl } from 'src/components/home/HomeTools/functions';
import { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods/dist-types/generated/parameters-and-response-types';
import TemplateIcon from 'src/assets/svg/svgexport-14.svg';
import GitHubIcon from '@mui/icons-material/GitHub';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';

export interface HomeRepositoryTemplateItemProps extends BoxProps {
  color: string;
  repository: RestEndpointMethodTypes['search']['repos']['response']['data']['items'][0];
}

export const HomeRepositoryTemplateItem = ({
  color,
  repository,
  ...props
}: HomeRepositoryTemplateItemProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [repositoryTemplateConfig, setRepositoryTemplateConfig] =
    useState<RepositoryTemplateConfig>();

  const fetchTemplateRepositoryConfig = useCallback(async () => {
    if (!repository) {
      return;
    }
    setLoading(true);
    const result = await fetch(
      githubRawContentUrl({
        owner: process.env.NEXT_PUBLIC_ORG ?? '',
        repositoryName: repository.name,
        repositoryBranch: repository.default_branch,
        filePath: 'training-template.json'
      }),
      {
        method: 'GET',
        cache: 'no-cache'
      }
    );
    if (result.ok) {
      const config = validateRepositoryTemplateConfig(await result.json());
      if (config) {
        setRepositoryTemplateConfig(config);
      }
    }
    setLoading(false);
  }, [repository]);

  useEffect(() => {
    fetchTemplateRepositoryConfig().catch();
  }, [fetchTemplateRepositoryConfig, repository]);

  return (
    <Box
      component={Link}
      href={`/template/${repository.name}`}
      display="flex"
      width={1}
      minHeight="240px"
      p={4}
      sx={{
        cursor: 'pointer',
        backgroundColor: color,
        borderRadius: '8px',
        boxShadow: '0 5px 25px 0 hsl(230deg 9% 52% / 15%)',
        textDecoration: 'none'
      }}
      {...props}>
      {loading && <CircularProgress />}
      {!loading && (
        <Stack
          flexDirection="column"
          justifyContent="space-between"
          alignItems="flex-start"
          width={1}
          flex={1}>
          <Stack flexDirection="column" alignItems="flex-start" width={1}>
            <Stack flexDirection="row" justifyContent="space-between" width={1}>
              <Image
                src={TemplateIcon}
                alt={repositoryTemplateConfig?.name ?? repository.name}
                width="36"
                height="36"
              />
              <Tooltip title="Repository">
                <IconButton component={Link} href={repository.html_url} target="_blank">
                  <GitHubIcon htmlColor="white" />
                </IconButton>
              </Tooltip>
            </Stack>
            <Typography variant="h3" fontSize="20px" gutterBottom pt={2} color="white">
              {repositoryTemplateConfig?.name ?? repository.name}
            </Typography>
            <Typography variant="body2" color="white" gutterBottom>
              {repositoryTemplateConfig?.description ?? repository.description}
            </Typography>
          </Stack>
          <Stack flexDirection="row" justifyContent="flex-end" width={1}>
            <Link
              target="_blank"
              href={repository.html_url}
              display="flex"
              justifyContent="center"
              variant="body2"
              rel="noopener"
              sx={{ color: '#ffffff' }}>
              <span>Use this template</span>
              <Icon
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '0.8em',
                  height: '0.8em',
                  ml: 1
                }}>
                <PlayCircleOutlinedIcon sx={{ width: '0.8em', height: '0.8em' }} />
              </Icon>
            </Link>
          </Stack>
        </Stack>
      )}
    </Box>
  );
};
