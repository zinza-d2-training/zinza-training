// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import cache from 'memory-cache';
import { RepositoryEvent } from '@octokit/webhooks-types';
import { createApiErrorResponse } from 'src/pages/api/index';
import { createGithubAdminClient } from 'src/libs/octokit';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = req.body as RepositoryEvent;
  if (typeof data !== 'object') {
    res.status(401).send('Invalid format!');
  }
  const repositoryName = data.repository?.name;
  const org = data.organization?.login;
  if (!repositoryName || org !== process.env.NEXT_PUBLIC_ORG) {
    res.status(401).send('Invalid request!');
  }
  if (repositoryName?.startsWith('template--')) {
    try {
      const githubAdminClient = createGithubAdminClient();
      const reposResponse = await githubAdminClient?.rest.search.repos({
        q: `template-- in:name org:${process.env.NEXT_PUBLIC_ORG}`
      });
      const templates = reposResponse.data.items.filter(
        (template) => template.name !== 'training-template'
      );
      cache.put('templates', templates, 5 * 60 * 1000);
      res.status(200).send('OK');
    } catch (e) {
      createApiErrorResponse<null>({ res });
    }
  } else {
    res.status(200).send('OK');
  }
};

export default handler;
