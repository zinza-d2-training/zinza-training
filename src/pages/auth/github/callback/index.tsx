import { Box } from '@mui/system';
import { NextPageContext } from 'next';
import { useEffect } from 'react';
import { setCookie } from 'src/utils/cookies';
import Cookies from 'js-cookie';

interface AuthGithubAccessTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
}

interface Props {
  access_token: string;
}

const AuthGithubCallback = ({ access_token }: Props) => {
  useEffect(() => {
    console.log(Cookies.get('github_access_token'));
  }, [access_token]);

  return <Box>OK</Box>;
};

export default AuthGithubCallback;

export async function getServerSideProps(context: NextPageContext) {
  if (!context.query.code || typeof context.query.code !== 'string') {
    throw new Error('Invalid request!');
  }
  const code: string = context.query.code;

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      code,
      redirect_uri: process.env.NEXT_PUBLIC_AUTH_GITHUB_CALLBACK
    })
  });

  const data: AuthGithubAccessTokenResponse = await response.json();

  if (context.res) {
    setCookie(context.res, 'github_access_token', data.access_token);
  }

  return {
    props: {
      access_token: data.access_token
    }
  };
}
