/**
 * @author Kaden Badalian
 *
 * @filename requests.js
 * @date 4/7/20
 */

import axios from 'axios';

const instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const $GET = (url) => instance.get(url)
  .then((res) => res.data)
  .catch((error) => {
    if (error.response) {
      throw error.response.data;
    }
    throw new Error(error);
  });

export const $POST = (url, body) => instance.post(url, body)
  .then((res) => res.data)
  .catch((error) => {
    if (error.response) {
      throw error.response.data;
    }
    throw new Error(error);
  });

export const $PUT = (url, body) => instance.put(url, body)
  .then((res) => res.data)
  .catch((error) => {
    if (error.response) {
      throw error.response.data;
    }
    throw new Error(error);
  });

export const $DEL = (url) => instance.delete(url)
  .then((res) => res.data)
  .catch((error) => {
    if (error.response) {
      throw error.response.data;
    }
    throw new Error(error);
  });
