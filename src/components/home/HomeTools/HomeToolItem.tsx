import { Stack, Typography } from '@mui/material';
import Image, { ImageProps } from 'next/image';
import { Box, BoxProps } from '@mui/system';
import { useCallback, useEffect, useState } from 'react';
import { RepositoryTemplateConfig } from 'src/components/Parsers/TemplateConfigParser';

export interface HomeToolItemProps extends BoxProps {
  icon: ImageProps['src'];
  title: string;
  description: string;
  repository?: {
    default_branch: string;
    name: string;
  };
}

export const HomeToolItem = ({
  title,
  description,
  icon,
  repository,
  ...props
}: HomeToolItemProps) => {
  const [repositoryTemplateConfig, setRepositoryTemplateConfig] =
    useState<RepositoryTemplateConfig>();

  const fetchTemplateRepositoryConfig = useCallback(async () => {
    if (!repository) {
      return;
    }
    const result = await fetch(
      `https://raw.githubusercontent.com/${process.env.NEXT_PUBLIC_ORG}/${repository.name}/${repository.default_branch}/training-template.json`,
      {
        method: 'GET',
        cache: 'no-cache'
      }
    );
    if (result.ok) {
      const data = await result.json();
      setRepositoryTemplateConfig(data);
    }
  }, [repository]);

  useEffect(() => {
    fetchTemplateRepositoryConfig().catch();
  }, [fetchTemplateRepositoryConfig, repository]);

  return (
    <Box
      width={1}
      minHeight="240px"
      p={4}
      sx={{ cursor: 'pointer', '&:hover': { background: '#f6f6f8' } }}
      {...props}>
      <Stack flexDirection="column" alignItems="flex-start">
        <Image src={icon} alt="me" width="50" height="50" />
        <Typography variant="h3" fontSize="20px" gutterBottom pt={2}>
          {repositoryTemplateConfig?.name ?? title}
        </Typography>
        <Typography variant="body2">
          {repositoryTemplateConfig?.description ?? description}
        </Typography>
      </Stack>
    </Box>
  );
};
