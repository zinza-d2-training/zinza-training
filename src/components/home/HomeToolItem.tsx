import { Stack, Typography } from '@mui/material';
import Image, { ImageProps } from 'next/image';
import { Box } from '@mui/system';

export interface HomeToolItemProps {
  icon: ImageProps['src'];
  title: string;
  description: string;
}

export const HomeToolItem = ({ title, description, icon }: HomeToolItemProps) => {
  return (
    <Box
      width={1}
      minHeight="240px"
      p={4}
      sx={{ cursor: 'pointer', '&:hover': { background: '#f6f6f8' } }}>
      <Stack flexDirection="column" alignItems="flex-start">
        <Image src={icon} alt="me" width="50" height="50" />
        <Typography variant="h3" fontSize="20px" gutterBottom pt={2}>
          {title}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </Stack>
    </Box>
  );
};
