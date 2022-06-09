import Link from 'next/link';
import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Stack,
  SwipeableDrawer,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { PrimaryMenuItem } from './PrimaryMenuItem';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useAppSelector } from 'src/store';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router';

export const Header = () => {
  const router = useRouter();
  const githubAccessToken = useAppSelector((state) => state.github.githubAccessToken);

  const authLink = useMemo<string>(() => {
    const params = [
      `client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}`,
      `redirect_uri=${process.env.NEXT_PUBLIC_AUTH_GITHUB_CALLBACK}`,
      `scope=repo`
    ];
    return `https://github.com/login/oauth/authorize?${params.join('&')}`;
  }, []);

  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const appTheme = useTheme();
  const matches = useMediaQuery(appTheme.breakpoints.up('sm'));

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };
  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

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
      sx={{ background: 'white', zIndex: (theme) => theme.zIndex.drawer }}
      boxShadow="0 3px 6px 0 rgb(50 50 50 / 30%)">
      <Stack
        flexDirection="row"
        sx={(theme) => ({
          flexDirection: 'row-reverse',
          [theme.breakpoints.up('sm')]: {
            flexDirection: 'row'
          }
        })}>
        <Link href="/">
          <Stack
            justifyContent="center"
            sx={(theme) => ({
              cursor: 'pointer',
              pl: 1,
              [theme.breakpoints.up('sm')]: {
                pl: 2
              }
            })}>
            <Box height="36px">
              <Image src="/logo.png" width="120" height="36" alt="home" />
            </Box>
          </Stack>
        </Link>
        {matches && (
          <Stack flexDirection="row">
            <PrimaryMenuItem
              content="React Training"
              href="/training/react"
              active={router.pathname === '/training/react'}
            />
            <PrimaryMenuItem
              content="Vue Training"
              href="/training/vue"
              active={router.pathname === '/training/vue'}
            />
            <PrimaryMenuItem
              content="Angular Training"
              href="/training/angular"
              active={router.pathname === '/training/angular'}
            />
          </Stack>
        )}
        {!matches && (
          <Stack justifyContent="center" ml={1}>
            <IconButton onClick={handleOpenDrawer} aria-label="Open menu">
              <MenuIcon />
            </IconButton>
            <SwipeableDrawer
              disableBackdropTransition={!iOS}
              disableDiscovery={iOS}
              open={openDrawer}
              onClose={handleCloseDrawer}
              onOpen={handleOpenDrawer}>
              <Stack spacing={2}>
                <List disablePadding>
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleCloseDrawer} aria-label="React">
                      <PrimaryMenuItem
                        fontWeight="400"
                        content="React Training"
                        href="/training/react"
                        textTransform="none"
                        active={router.pathname === '/training/react'}
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleCloseDrawer} aria-label="Vue">
                      <PrimaryMenuItem
                        fontWeight="400"
                        content="Vue Training"
                        href="/training/vue"
                        textTransform="none"
                        active={router.pathname === '/training/vue'}
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleCloseDrawer} aria-label="Angular">
                      <PrimaryMenuItem
                        fontWeight="400"
                        content="Angular Training"
                        href="/training/angular"
                        textTransform="none"
                        active={router.pathname === '/training/angular'}
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </List>
              </Stack>
            </SwipeableDrawer>
          </Stack>
        )}
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
