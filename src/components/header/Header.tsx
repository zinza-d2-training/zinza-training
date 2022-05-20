import Link from 'next/link';
import { Button, Stack } from '@mui/material';
import { PrimaryMenuItem } from './PrimaryMenuItem';
import { useMemo } from 'react';
import { Box } from '@mui/system';
import Image from 'next/image';
import { useAppSelector } from 'src/store';

export const Header = () => {
  const githubAccessToken = useAppSelector((state) => state.github.githubAccessToken);

  const authLink = useMemo<string>(() => {
    const params = [
      `client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}`,
      `redirect_uri=${process.env.NEXT_PUBLIC_AUTH_GITHUB_CALLBACK}`,
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
            <Box height="36px">
              <Image src="/logo.png" width="120" height="36" alt="home" />
            </Box>
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
