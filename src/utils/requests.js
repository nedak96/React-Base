/**
 * @author Kaden Badalian
 *
 * @filename requests.js
 * @date 4/7/20
 */

import axios from 'axios';
import { getAuthProp } from './auth';

axios.defaults.headers = {
  'Content-Type': 'application/json',
};

// Automatically add auth token to header
axios.interceptors.request.use((config) => ({
  ...config,
  headers: {
    ...config.headers,
    Authorization: getAuthProp('access_token') ? `Bearer ${getAuthProp('access_token')}` : '',
  },
}));

export const $GET = (url) => axios.get(url)
  .then((res) => res.data)
  .catch((error) => {
    throw error.response;
  });

export const $POST = (url, body) => axios.post(url, body)
  .then((res) => res.data)
  .catch((error) => {
    throw error.response;
  });

export const $PUT = (url, body) => axios.put(url, body)
  .then((res) => res.data)
  .catch((error) => {
    throw error.response;
  });

export const $DEL = (url) => axios.delete(url)
  .then((res) => res.data)
  .catch((error) => {
    throw error.response;
  });
