import type { NextPage } from 'next';
import { HomePage } from '../components/home/HomePage';
import { NextPageContext } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import { fetchRepositoryTemplateConfig } from 'src/api/repositories/templates';

const Home: NextPage = () => {
  return <HomePage />;
};

export default Home;

export async function getServerSideProps(context: NextPageContext) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('repositoryTemplatesQuery', fetchRepositoryTemplateConfig);

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}
