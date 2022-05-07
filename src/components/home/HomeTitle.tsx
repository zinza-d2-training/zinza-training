import { Stack, Typography } from '@mui/material';

export const HomeTitle = () => {
  return (
    <Stack
      flexDirection="column"
      alignItems="center"
      width={1}
      pb="100px"
      pt={6}
      px="45"
      sx={{
        background: 'linear-gradient(90deg,#882e27,#6d869a 50%,#231641) #44287d'
      }}>
      <Typography
        variant="h1"
        color="white"
        sx={{ width: 1, maxWidth: '1100px', fontSize: '42px' }}
        textAlign="center"
        fontWeight={500}
        gutterBottom>
        Every project you need to work in one place
      </Typography>
      <Typography
        variant="h2"
        color="white"
        sx={{ width: 1, maxWidth: '960px', fontSize: '22px' }}
        textAlign="center">
        Every project template you need to generate, at your fingertips. All are 100% FREE and easy
        to use! Create, sync, deploy, rollback with just a few clicks
      </Typography>
    </Stack>
  );
};
