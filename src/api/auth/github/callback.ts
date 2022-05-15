import { createAxiosInstance } from 'src/components/axios/functions';

export interface AuthGithubAccessTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
}

export const fetchGithubAccessToken = async (payload: { code: string }) => {
  const axios = createAxiosInstance();
  return await axios.post<AuthGithubAccessTokenResponse>(
    'https://github.com/login/oauth/access_token',
    {
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      code: payload.code,
      redirect_uri: process.env.NEXT_PUBLIC_AUTH_GITHUB_CALLBACK
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }
  );
};
