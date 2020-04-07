/**
 * @author Kaden Badalian
 *
 * @filename actionTypes.js
 * @date 4/7/20
 */

const GET = 'get';
const PUT = 'put';
const POST = 'post';
const DELETE = 'delete';
const REQUEST_HEADERS = {
  'Content-Type': 'application/json',
};

function buildRequest(verb, options) {
  const requestHeaders = { ...REQUEST_HEADERS };

  // Adds `Authorization` header to request if token parameter is defined
  // if (options.token) requestHeaders.Authorization = `Bearer ${options.token}`;

  // Returns request object
  // const req = { method: verb, headers: new Headers(requestHeaders), credentials: 'include' };
  const req = { method: verb, headers: new Headers(requestHeaders) };

  // Appends body to request if it's defined
  if (options && options.body) req.body = JSON.stringify(options.body);

  // Returns the request
  return req;
}

export const $GET = (url, options = {}) => fetch(url, buildRequest(GET, options))
  .then((res) => {
    if (res.redirected) {
      return res;
    }
    if (res.ok) {
      return res.json();
    }
    throw new Error(res.statusText);
  })
  .catch((error) => { throw error; });

export const $POST = (url, options = {}) => fetch(url, buildRequest(POST, options))
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(res.statusText);
  })
  .catch((error) => { throw error; });

export const $PUT = (url, options = {}) => fetch(url, buildRequest(PUT, options))
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(res.statusText);
  })
  .catch((error) => { throw error; });

export const $DEL = (url, options = {}) => fetch(url, buildRequest(DELETE, options))
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(res.statusText);
  })
  .catch((error) => { throw error; });
