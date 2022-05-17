// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { createApiSuccessResponse } from 'src/pages/api/index';

export type HealthCheckResponse = {
  data: {
    status: string;
  };
};

export default function handler(req: NextApiRequest, res: NextApiResponse<HealthCheckResponse>) {
  createApiSuccessResponse({ res, data: { status: 'Ok' } });
}
