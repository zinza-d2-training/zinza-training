import { createAxiosInstance } from 'src/components/axios/functions';
import { useQuery } from 'react-query';
import { RepositoriesTemplatesResponse } from 'src/pages/api/repositories/templates';

export const fetchRepositoryTemplateConfig = () => {
  return createAxiosInstance()
    .get<{
      data: RepositoriesTemplatesResponse;
    }>(`${process.env.NEXT_PUBLIC_API_URL}/api/repositories/templates`)
    .then((res) => res.data);
};

export const useRepositoryTemplatesQuery = () => {
  return useQuery({
    queryKey: 'repositoryTemplatesQuery',
    queryFn: () => fetchRepositoryTemplateConfig(),
    retry: false
  });
};
