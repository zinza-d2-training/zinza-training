import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  Stack,
  SwipeableDrawer,
  SwipeableDrawerProps
} from '@mui/material';
import { PrimaryMenuItem } from 'src/components/header/PrimaryMenuItem';
import { useRouter } from 'next/router';

export interface MobileDrawerProps extends SwipeableDrawerProps {}

export const MobileDrawer = (props: MobileDrawerProps) => {
  const router = useRouter();

  return (
    <SwipeableDrawer {...props}>
      <Stack spacing={2}>
        <List disablePadding>
          <ListItem disablePadding>
            <ListItemButton onClick={props.onClose} aria-label="React">
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
            <ListItemButton onClick={props.onClose} aria-label="Vue">
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
            <ListItemButton onClick={props.onClose} aria-label="Angular">
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
  );
};
