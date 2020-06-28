/**
 * @author Kaden Badalian
 *
 * @filename requests.js
 * @date 4/7/20
 */

import axios from 'axios';
import store from '../redux/store';
import { setToken } from '../redux/actions/global';

axios.defaults.headers = {
  'Content-Type': 'application/json',
};

// Automatically add JWT to header
axios.interceptors.request.use((config) => ({
  ...config,
  headers: {
    ...config.headers,
    Authorization: store.getState().localstorage.token ? `Bearer ${store.getState().localstorage.token}` : '',
  },
}));

// Automatically set token if defined in response
axios.interceptors.response.use((res) => {
  if (res.data && res.data.token) {
    store.dispatch(setToken(res.data.token));
  }
  return res;
});

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
