// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { createGithubAdminClient } from 'src/libs/octokit';
import { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods/dist-types/generated/parameters-and-response-types';
import { createApiErrorResponse, createApiSuccessResponse } from 'src/pages/api/index';

export type RepositoriesTemplatesResponse =
  RestEndpointMethodTypes['search']['repos']['response']['data']['items'];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const githubAdminClient = createGithubAdminClient();
  try {
    const reposResponse = await githubAdminClient?.rest.search.repos({
      q: `template-- in:name org:${process.env.NEXT_PUBLIC_ORG}`
    });
    const templates = reposResponse.data.items.filter(
      (template) => template.name !== 'training-template'
    );
    createApiSuccessResponse<RepositoriesTemplatesResponse>({
      data: templates,
      res
    });
  } catch (e) {
    createApiErrorResponse<null>({ res });
  }
};

export default handler;
