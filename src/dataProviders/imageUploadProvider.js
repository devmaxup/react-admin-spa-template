import restProvider from 'ra-data-simple-rest';
import { API_URL } from '../constants';
import fetchJson, { FETCH_CONFIG } from './fetchJson';

const dataProvider = restProvider(`${API_URL}/admin`, (url, options = {}) =>
  fetchJson(url, { ...options, ...FETCH_CONFIG })
);

const readFileAsBase64 = ({ key, rawFile }) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve({ key, value: reader.result });
    reader.onerror = reject;

    reader.readAsDataURL(rawFile);
  });

const isImage = (value) => value && value.rawFile instanceof File;

const getDataWithoutImages = (params) =>
  Object.keys(params.data).reduce((data, key) => {
    const value = params.data[key];

    if (!isImage(value)) {
      // eslint-disable-next-line no-param-reassign
      data[key] = value;
    }
    return data;
  }, {});

const getImagesData = (params) =>
  Object.keys(params.data).reduce((data, key) => {
    const value = params.data[key];

    if (isImage(value)) {
      data.push({
        ...value,
        key,
      });
    }
    return data;
  }, []);

const convertImagesToBase64 = (params) => {
  const dataWithoutImages = getDataWithoutImages(params);
  const dataImagesArray = getImagesData(params);

  return Promise.all(dataImagesArray.map(readFileAsBase64)).then(
    (base64Images) => ({
      ...params,
      data: {
        ...dataWithoutImages,
        ...base64Images.reduce((data, { key, value }) => {
          // eslint-disable-next-line no-param-reassign
          data[key] = value;
          return data;
        }, {}),
      },
    })
  );
};

export default {
  ...dataProvider,
  create: (resource, params) =>
    convertImagesToBase64(params).then((paramsWithImages) =>
      dataProvider.create(resource, paramsWithImages)
    ),
  update: (resource, params) =>
    convertImagesToBase64(params).then((paramsWithImages) =>
      dataProvider.update(resource, paramsWithImages)
    ),
};
