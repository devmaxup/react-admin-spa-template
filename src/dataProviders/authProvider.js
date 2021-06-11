import { fetchUtils } from 'react-admin';
import { API_URL, AUTH_TOKEN_NAME } from '../constants';
import { FETCH_CONFIG } from './fetchJson';

const applyAuthToken = () => {
  const token = localStorage.getItem(AUTH_TOKEN_NAME);
  if (!token) {
    return;
  }
  FETCH_CONFIG.headers.set('Authorization', token);
};

const saveToken = (token) => {
  localStorage.setItem(AUTH_TOKEN_NAME, token);

  applyAuthToken();
};

const removeToken = () => {
  localStorage.removeItem(AUTH_TOKEN_NAME);
  FETCH_CONFIG.headers.delete('Authorization');
};

const isTokenPresent = () => !!localStorage.getItem(AUTH_TOKEN_NAME);

const login = ({ username, password }) =>
  fetchUtils
    .fetchJson(`${API_URL}/login`, {
      method: 'POST',
      body: JSON.stringify({
        email: username,
        password,
      }),
      ...FETCH_CONFIG,
    })
    .then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }

      const data = response.json;
      saveToken(data.accessToken);
      return data;
    });

const logoutOnAuthError = ({ status }) => {
  if (status === 401 || status === 403) {
    document.location.hash = '#/login';
    removeToken();
  }
};

// eslint-disable-next-line complexity
export default {
  // authentication
  login,
  checkError: (error) => {
    logoutOnAuthError(error);
    return Promise.resolve();
  },
  checkAuth: () => (isTokenPresent() ? Promise.resolve() : Promise.reject()),
  logout: () => {
    removeToken();
    return Promise.resolve();
  },
  getIdentity: () => Promise.resolve(),
  // authorization
  getPermissions: () => Promise.resolve(),
};

applyAuthToken();
