// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { createApiErrorResponse, createApiSuccessResponse } from 'src/pages/api/index';
import { createAxiosInstance } from 'src/components/axios/functions';
import { RepositoryTemplateConfig } from 'src/components/Parsers/TemplateConfigParser';
import { githubRawContentUrl } from 'src/components/home/HomeTools/functions';

interface RequestPayload {
  path: string;
  repositoryName: string;
  repositoryBranch: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = req.body as RequestPayload;
  try {
    if (data.path && data.repositoryName && data.repositoryBranch && req.method === 'POST') {
      const response = await createAxiosInstance().get<RepositoryTemplateConfig>(
        githubRawContentUrl({
          owner: process.env.NEXT_PUBLIC_ORG ?? '',
          repositoryName: data.repositoryName,
          repositoryBranch: data.repositoryBranch,
          filePath: data.path
        }),
        {
          headers: {
            Authorization: `token ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`
          }
        }
      );
      createApiSuccessResponse<RepositoryTemplateConfig>({
        data: response.data,
        res
      });
    } else {
      createApiErrorResponse<null>({ res });
    }
  } catch (e) {
    createApiErrorResponse<null>({ res });
  }
};

export default handler;
