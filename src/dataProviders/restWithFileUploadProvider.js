import restProvider from 'ra-data-simple-rest';
import { API_URL } from '../constants';
import fetchJson, { FETCH_CONFIG } from './fetchJson';

const fullApiUrl = `${API_URL}/admin`;

const dataProvider = restProvider(fullApiUrl, (url, options = {}) =>
  fetchJson(url, { ...options, ...FETCH_CONFIG })
);

const isFile = (value) => value && value.rawFile instanceof File;

const sendFilesAsFormDataElseJson = (method, resource, params) => {
  const hasFiles = !!Object.values(params.data).find(isFile);

  // fallback to the default implementation
  if (!hasFiles) {
    return method === 'POST'
      ? dataProvider.create(resource, params)
      : dataProvider.update(resource, params);
  }

  const formData = new FormData();
  Object.keys(params.data).forEach((key) =>
    formData.append(
      key,
      isFile(params.data[key])
        ? console.log(params.data[key].rawFile) || params.data[key].rawFile
        : params.data[key]
    )
  );

  return fetchJson(fullApiUrl, {
    ...FETCH_CONFIG,
    method,
    body: formData,
  }).then(({ json }) => ({
    data: { ...params.data, id: json.id },
  }));
};

export default {
  ...dataProvider,
  create: (resource, params) =>
    sendFilesAsFormDataElseJson('POST', resource, params),
  update: (resource, params) =>
    sendFilesAsFormDataElseJson('PUT', resource, params),
};
