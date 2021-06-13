import { fetchUtils } from 'react-admin';

export const FETCH_CONFIG = {
  headers: new Headers({
    Accept: 'application/json',
    'Access-Control-Expose-Headers': 'Content-Range, X-Total-Count',
  }),
};

export default async (url, options = {}) => {
  const headers = new Headers(options.headers || FETCH_CONFIG.headers);
  if (
    !options.headers.has('Content-Type') &&
    !(options && options.body && options.body instanceof FormData)
  ) {
    headers.set('Content-Type', 'application/json');
  }

  if (options.user && options.user.authenticated && options.user.token) {
    headers.set('Authorization', options.user.token);
  }

  return fetchUtils.fetchJson(url, { ...options, headers });
};
