import { createAxiosInstance } from 'src/components/axios/functions';
import { RepositoryTemplateConfig } from 'src/components/Parsers/TemplateConfigParser';
import { useQuery } from 'react-query';

export interface RepositoryTemplateConfigQueryVariables {
  repositoryName: string;
  repositoryBranch: string;
}

export const fetchRepositoryTemplateConfig = ({
  repositoryName,
  repositoryBranch
}: RepositoryTemplateConfigQueryVariables) => {
  return createAxiosInstance().post<{ data: RepositoryTemplateConfig }>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/github/file-content`,
    {
      repositoryName,
      repositoryBranch,
      path: 'training-template.json'
    }
  );
};

export const useRepositoryTemplateConfigQuery = (
  variables: RepositoryTemplateConfigQueryVariables
) => {
  return useQuery({
    queryKey: ['repositoryTemplatesQuery', variables],
    queryFn: () => fetchRepositoryTemplateConfig(variables),
    retry: false
  });
};
