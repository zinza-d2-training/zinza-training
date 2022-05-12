import Error from 'next/error';
import { ReactElement } from 'react';
import { ErrorLayout } from '../components/layouts/ErrorLayout';

const Error500 = () => {
  return <Error statusCode={500} />;
};

export default Error500;

Error500.getLayout = function getLayout(page: ReactElement) {
  return <ErrorLayout>{page}</ErrorLayout>;
};
