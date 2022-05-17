import { githubRawContentUrl } from 'src/components/home/HomeTools/functions';
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
  return createAxiosInstance().get<RepositoryTemplateConfig>(
    githubRawContentUrl({
      owner: process.env.NEXT_PUBLIC_ORG ?? '',
      repositoryName,
      repositoryBranch,
      filePath: 'training-template.json'
    })
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
