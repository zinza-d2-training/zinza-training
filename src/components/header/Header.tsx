import Link from 'next/link';
import { Stack } from '@mui/material';
import { PrimaryMenuItem } from './PrimaryMenuItem';

export const Header = () => {
  return (
    <Stack
      position="fixed"
      top="0"
      left="0"
      width={1}
      flexDirection="row"
      height="60px"
      component="header"
      sx={{ background: 'white' }}
      boxShadow="0 3px 6px 0 rgb(50 50 50 / 30%)">
      <Link href="/">
        <Stack justifyContent="center" pl={2} sx={{ cursor: 'pointer' }}>
          <img src="/logo.png" />
        </Stack>
      </Link>
      <PrimaryMenuItem content="React Training" href="/training/react" />
      <PrimaryMenuItem content="Vue Training" href="/training/vue" />
      <PrimaryMenuItem content="Angular Training(coming soon)" href="/training/angular" />
    </Stack>
  );
};
