import { HttpError } from 'react-admin';

export const FETCH_CONFIG = {
  headers: new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Expose-Headers': 'Content-Range, X-Total-Count',
  }),
};

export default async (url, options = {}) => {
  const requestHeaders =
    options.headers ||
    new Headers({
      Accept: 'application/json',
    });

  if (
    !requestHeaders.has('Content-Type') &&
    !(options && options.body && options.body instanceof FormData)
  ) {
    requestHeaders.set('Content-Type', 'application/json');
  }

  if (options.user && options.user.authenticated && options.user.token) {
    requestHeaders.set('Authorization', options.user.token);
  }

  const response = await fetch(url, { ...options, headers: requestHeaders });
  const body = await response.text();

  const { status, statusText, headers } = response;

  let json;
  try {
    json = JSON.parse(body);
  } catch (e) {
    json = {};
    json.message = 'Something went wrong';
  }

  if (status < 200 || status >= 300) {
    return Promise.reject(
      new HttpError(json.message || statusText, status, json)
    );
  }

  return Promise.resolve({
    status,
    headers,
    body,
    json,
  });
};
