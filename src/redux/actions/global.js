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
} from '../actions';
import { UNAUTHORIZED } from '../../constants/responseCodes';
import { $GET } from '../../utils/requests';

const usersAPI = 'api/v1/users';

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

export const logout = createAction(LOGOUT);

export const toggleSidebar = createAction(TOGGLE_SIDEBAR);

export const toggleDarkMode = createAction(TOGGLE_DARK_MODE);

export const setToken = createAction(SET_TOKEN);
