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
import { useMemo } from 'react';
import { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods/dist-types/generated/parameters-and-response-types';
import TemplateIcon from 'src/assets/svg/svgexport-14.svg';
import GitHubIcon from '@mui/icons-material/GitHub';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import { useRepositoryTemplateConfigQuery } from 'src/api/repositories/templates/config';
import NextLink from 'next/link';

export interface HomeRepositoryTemplateItemProps extends BoxProps {
  color: string;
  repository: RestEndpointMethodTypes['search']['repos']['response']['data']['items'][0];
}

export const HomeRepositoryTemplateItem = ({
  color,
  repository,
  ...props
}: HomeRepositoryTemplateItemProps) => {
  const { data: repositoryTemplatesData, isLoading } = useRepositoryTemplateConfigQuery({
    repositoryName: repository.name,
    repositoryBranch: repository.default_branch
  });

  const repositoryTemplateConfig = useMemo(() => {
    return repositoryTemplatesData?.data;
  }, [repositoryTemplatesData?.data]);

  return (
    <Box
      display="flex"
      width={1}
      minHeight="240px"
      p={4}
      sx={{
        backgroundColor: color,
        borderRadius: '8px',
        boxShadow: '0 5px 25px 0 hsl(230deg 9% 52% / 15%)',
        textDecoration: 'none'
      }}
      {...props}>
      {isLoading && <CircularProgress />}
      {!isLoading && (
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
            <NextLink href={`/templates/${repository.name}`} passHref>
              <Typography
                underline="hover"
                component={Link}
                variant="h3"
                fontSize="20px"
                gutterBottom
                pt={2}
                sx={{ color: '#ffffff' }}>
                {repositoryTemplateConfig?.name ?? repository.name}
              </Typography>
            </NextLink>
            <Typography variant="body2" color="white" gutterBottom>
              {repositoryTemplateConfig?.description ?? repository.description}
            </Typography>
          </Stack>
          <Stack flexDirection="row" justifyContent="flex-end" width={1}>
            <NextLink href={`/templates/${repository.name}/generate`} passHref>
              <Link
                underline="hover"
                display="flex"
                justifyContent="center"
                variant="body2"
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
            </NextLink>
          </Stack>
        </Stack>
      )}
    </Box>
  );
};
