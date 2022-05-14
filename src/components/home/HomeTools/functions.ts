export const githubRawContentUrl = (params: {
  owner: string;
  filePath: string;
  repositoryName: string;
  repositoryBranch: string;
}) => {
  return `https://raw.githubusercontent.com/${params.owner}/${params.repositoryName}/${params.repositoryBranch}/${params.filePath}`;
};
