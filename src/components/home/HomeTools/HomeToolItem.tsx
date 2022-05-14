import { Stack, Typography } from '@mui/material';
import Image, { ImageProps } from 'next/image';
import { Box, BoxProps } from '@mui/system';

export interface HomeToolItemProps extends BoxProps {
  icon: ImageProps['src'];
  title: string;
  description: string;
}

export const HomeToolItem = ({ title, description, icon, ...props }: HomeToolItemProps) => {
  return (
    <Box
      width={1}
      minHeight="240px"
      p={4}
      sx={{ cursor: 'pointer', '&:hover': { background: '#f6f6f8' } }}
      {...props}>
      <Stack flexDirection="column" alignItems="flex-start">
        <Image src={icon} alt={title} width="50" height="50" />
        <Typography variant="h3" fontSize="20px" gutterBottom pt={2}>
          {title}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </Stack>
    </Box>
  );
};
