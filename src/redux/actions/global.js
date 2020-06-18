/**
 * @author Kaden Badalian
 *
 * @filename global.js
 * @date 4/7/20
 */

import { createAction } from '@reduxjs/toolkit';
import {
  TOGGLE_SIDEBAR,
  LOGOUT,
  VALIDATE_TOKEN,
  TOKEN_NOT_VALID,
  TOKEN_VALID,
  VALIDATE_TOKEN_ERROR,
  SET_TOKEN,
  TOGGLE_DARK_MODE,
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_ERROR,
  FETCH_CATEGORIES_SUCCESS,
} from '../actions';
import { UNAUTHORIZED } from '../../constants/responseCodes';
import { $GET } from '../../utils/requests';

const usersAPI = 'api/v1/users';
const categoriesAPI = 'api/v1/categories';

export const validateToken = () => (dispatch) => {
  dispatch({
    type: VALIDATE_TOKEN,
  });
  return $GET(`${usersAPI}/validate-token`)
    .then((res) => (
      dispatch({
        type: TOKEN_VALID,
        payload: res.user,
      })
    ))
    .catch((error) => {
      if (error.status === UNAUTHORIZED) {
        return dispatch({
          type: TOKEN_NOT_VALID,
        });
      }
      return dispatch({
        type: VALIDATE_TOKEN_ERROR,
      });
    });
};

export const fetchCategories = () => (dispatch) => {
  dispatch({
    type: FETCH_CATEGORIES,
  });
  return $GET(`${categoriesAPI}`)
    .then((res) => {
      const categories = res.docs.reduce((acc, curr) => {
        acc[curr._id] = {
          children: res.docs.filter((cat) => cat.parentId === curr._id).map((cat) => cat._id),
          name: curr.name,
          parentId: curr.parentId === null ? 'Browse' : curr.parentId,
        };
        return acc;
      }, {});
      categories.Browse = {
        name: 'Browse',
        children: res.docs.filter((cat) => cat.parentId === null).map((cat) => cat._id),
      };
      return dispatch({
        type: FETCH_CATEGORIES_SUCCESS,
        payload: categories,
      });
    })
    .catch(() => (
      dispatch({
        type: FETCH_CATEGORIES_ERROR,
      })
    ));
};

export const logout = createAction(LOGOUT);

export const toggleSidebar = createAction(TOGGLE_SIDEBAR);

export const toggleDarkMode = createAction(TOGGLE_DARK_MODE);

export const setToken = createAction(SET_TOKEN);
