import { Box } from '@mui/material';
import { NextPageContext } from 'next';
import { setCookie } from 'src/utils/cookies';
import { fetchGithubAccessToken } from 'src/api/auth/github/callback';

const AuthGithubCallback = () => {
  return <Box>OK</Box>;
};

export default AuthGithubCallback;

export async function getServerSideProps(context: NextPageContext) {
  if (!context.query.code || typeof context.query.code !== 'string') {
    throw new Error('Invalid request!');
  }
  const code: string = context.query.code;
  if (!context.res) {
    throw new Error('Invalid context');
  }
  try {
    const response = await fetchGithubAccessToken({ code });
    setCookie(context.res, 'github_access_token', response.data.access_token);
    return {
      redirect: {
        destination: '/',
        permanent: true
      }
    };
  } catch (e) {
    return {
      redirect: {
        destination: '/500',
        permanent: true
      }
    };
  }
}
