// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { createGithubAdminClient } from 'src/libs/octokit';
import { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods/dist-types/generated/parameters-and-response-types';
import { createApiErrorResponse, createApiSuccessResponse } from 'src/pages/api/index';
import cache from 'memory-cache';

export type RepositoriesTemplatesResponse =
  RestEndpointMethodTypes['search']['repos']['response']['data']['items'];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const githubAdminClient = createGithubAdminClient();
  try {
    const cachedTemplates = cache.get('templates');
    if (cachedTemplates) {
      createApiSuccessResponse<RepositoriesTemplatesResponse>({
        data: cachedTemplates,
        res
      });
    } else {
      const reposResponse = await githubAdminClient?.rest.search.repos({
        q: `template-- in:name org:${process.env.NEXT_PUBLIC_ORG}`
      });
      const templates = reposResponse.data.items.filter(
        (template) => template.name !== 'training-template'
      );
      cache.put('templates', templates, 5 * 60 * 1000);
      createApiSuccessResponse<RepositoriesTemplatesResponse>({
        data: templates,
        res
      });
    }
  } catch (e) {
    createApiErrorResponse<null>({ res });
  }
};

export default handler;
