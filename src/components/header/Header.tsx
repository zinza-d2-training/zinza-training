import Link from 'next/link';
import { Button, Stack } from '@mui/material';
import { PrimaryMenuItem } from './PrimaryMenuItem';
import Image from 'next/image';
import { Box } from '@mui/system';
import { useMemo } from 'react';
import Cookies from 'js-cookie';

export const Header = () => {
  const githubAccessToken = useMemo(() => {
    return Cookies.get('github_access_token');
  }, []);

  const authLink = useMemo<string>(() => {
    const params = [
      `client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}`,
      `redirect_uri=http://localhost:3000/auth/github/callback`,
      `scope=repo`
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
      sx={{ background: 'white', zIndex: (theme) => theme.zIndex.modal }}
      boxShadow="0 3px 6px 0 rgb(50 50 50 / 30%)">
      <Stack flexDirection="row">
        <Link href="/">
          <Stack justifyContent="center" pl={2} sx={{ cursor: 'pointer' }}>
            <img src="/logo.png" alt="home" height="36px" />
          </Stack>
        </Link>
        <PrimaryMenuItem content="React Training" href="/training/react" />
        <PrimaryMenuItem content="Vue Training" href="/training/vue" />
        <PrimaryMenuItem content="Angular Training(coming soon)" href="/training/angular" />
      </Stack>
      {!githubAccessToken && (
        <Stack flexDirection="row">
          <Link href={authLink}>
            <Button
              sx={{
                color: 'black',
                width: '80px',
                borderRadius: 0,
                backgroundColor: 'rgb(243, 240, 236)',
                '&:hover': { backgroundColor: 'rgb(56, 62, 69)', color: 'white' }
              }}>
              Login
            </Button>
          </Link>
        </Stack>
      )}
    </Stack>
  );
};
