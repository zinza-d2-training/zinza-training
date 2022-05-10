import Link from 'next/link';
import { Button, Stack } from '@mui/material';
import { PrimaryMenuItem } from './PrimaryMenuItem';
import Image, { ImageProps } from 'next/image';
import { Box } from '@mui/system';
import { useMemo } from 'react';

export const Header = () => {
  const authLink = useMemo<string>(() => {
    const params = [
      `client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}`,
      `redirect_uri=http://localhost:3000/auth/github/callback`
    ];
    return `https://github.com/login/oauth/authorize?${params.join('&')}`;
  }, []);

  return (
    <Stack
      position="fixed"
      top="0"
      left="0"
      width={1}
      flexDirection="row"
      justifyContent="space-between"
      height="60px"
      component="header"
      sx={{ background: 'white' }}
      boxShadow="0 3px 6px 0 rgb(50 50 50 / 30%)">
      <Stack flexDirection="row">
        <Link href="/">
          <Stack justifyContent="center" pl={2} sx={{ cursor: 'pointer' }}>
            <Box position="relative" width="100%" height="100%">
              <Image src="/logo.png" alt="home" layout="fill" objectFit="contain" />
            </Box>
          </Stack>
        </Link>
        <PrimaryMenuItem content="React Training" href="/training/react" />
        <PrimaryMenuItem content="Vue Training" href="/training/vue" />
        <PrimaryMenuItem content="Angular Training(coming soon)" href="/training/angular" />
      </Stack>
      <Stack flexDirection="row">
        <Link href={authLink}>
          <Button>Login</Button>
        </Link>
      </Stack>
    </Stack>
  );
};
