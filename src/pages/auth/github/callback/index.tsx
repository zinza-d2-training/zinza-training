import { Box } from '@mui/system';
import { NextPageContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

interface Props extends ParsedUrlQuery {}

const AuthGithubCallback = (props: Props) => {
  return <Box>{JSON.stringify(props)}</Box>;
};

export default AuthGithubCallback;

export async function getServerSideProps(context: NextPageContext) {
  return {
    props: context.query // will be passed to the page component as props
  };
}
