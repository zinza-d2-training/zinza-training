import { SxProps } from '@mui/system';
import { Stack, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import Link from 'next/link';

interface Props {
  href: string;
  content: string;
}

const classes: SxProps<Theme> = {
  content: {
    '&:hover': {
      color: 'red'
    }
  }
};

export const PrimaryMenuItem = ({ content, href }: Props) => {
  return (
    <Link href={href}>
      <Stack
        height={1}
        alignItems="center"
        justifyContent="center"
        px={2}
        sx={{
          cursor: 'pointer',
          '&:hover': {
            color: 'red'
          }
        }}>
        <Typography textTransform="uppercase" fontWeight="500">
          {content}
        </Typography>
      </Stack>
    </Link>
  );
};
