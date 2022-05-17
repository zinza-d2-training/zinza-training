import { NextApiResponse } from 'next';

export interface ApiResponse<T> {
  data: T;
}
export interface ApiSuccessResponse<T> extends ApiResponse<T> {}
export interface ApiErrorResponse<T> extends ApiResponse<null> {
  error: T | null;
  message: string;
}

export interface CreateApiSuccessResponseOptions<T> {
  res: NextApiResponse<ApiSuccessResponse<T>>;
  data: T;
  status?: number;
}
export function createApiSuccessResponse<T>({
  res,
  data,
  status = 200
}: CreateApiSuccessResponseOptions<T>): void {
  res.status(status).json({ data: data });
}

export interface CreateApiErrorResponseOptions<T> {
  res: NextApiResponse<ApiErrorResponse<T>>;
  error?: T | null;
  message?: string;
  status?: number;
}
export function createApiErrorResponse<T>({
  res,
  error = null,
  message = 'Internal Server Error',
  status = 500
}: CreateApiErrorResponseOptions<T>): void {
  res.status(status).json({ data: null, error, message });
}
