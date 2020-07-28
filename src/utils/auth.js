/**
 * @author Kaden Badalian
 *
 * @filename auth.js
 * @date 7/28/20
 */

export const editAuthProp = (prop, newVal) => {
  const authKey = Object.keys(localStorage).find((key) => key.startsWith('@@auth0spajs@@'));
  if (!authKey) {
    return false;
  }
  const authObj = JSON.parse(localStorage.getItem(authKey));
  switch (prop) {
    case 'id_token':
      authObj.body.id_token = newVal;
      break;
    case 'access_token':
      authObj.body.access_token = newVal;
      break;
    case 'user':
      authObj.body.decodedToken.user = newVal;
      break;
    default:
      return false;
  }
  localStorage.setItem(authKey, JSON.stringify(authObj));
  return true;
};

export const getAuthProp = (prop) => {
  const authKey = Object.keys(localStorage).find((key) => key.startsWith('@@auth0spajs@@'));
  if (!authKey) {
    return undefined;
  }
  const authObj = JSON.parse(localStorage.getItem(authKey));
  switch (prop) {
    case 'id_token':
      return authObj.body.id_token;
    case 'access_token':
      return authObj.body.access_token;
    case 'user':
      return authObj.body.decodedToken.user;
    default:
      return undefined;
  }
};
