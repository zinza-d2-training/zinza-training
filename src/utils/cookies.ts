import { CookieSerializeOptions, serialize } from 'cookie';
import { ServerResponse } from 'http';

/**
 * This sets `cookie` using the `res` object
 */

export const setCookie = (
  res: ServerResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {}
) => {
  const stringValue = typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value);

  if ('maxAge' in options) {
    const maxAge = options?.maxAge ?? 0;
    options.expires = new Date(Date.now() + maxAge);
    options.maxAge = maxAge / 1000;
  }

  res.setHeader('Set-Cookie', serialize(name, stringValue, { path: '/', ...options }));
};
