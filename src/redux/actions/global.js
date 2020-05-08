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
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  CHECK_SESSION,
  CHECK_SESSION_ERROR,
  SESSION_FOUND,
  SESSION_NOT_FOUND,
} from '../actions';
import { $GET } from '../../utils/requests';

const usersAPI = 'api/v1/users';

export const checkSession = () => (dispatch) => {
  dispatch({
    type: CHECK_SESSION,
  });
  return $GET(`${usersAPI}/check-session`)
    .then((res) => {
      if (res.sessionValid) {
        return dispatch({
          type: SESSION_FOUND,
          payload: res,
        });
      }
      return dispatch({
        type: SESSION_NOT_FOUND,
      });
    })
    .catch(() => (
      dispatch({
        type: CHECK_SESSION_ERROR,
      })
    ));
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  return $GET(`${usersAPI}/logout`)
    .then(() => (
      dispatch({
        type: LOGOUT_SUCCESS,
      })
    ))
    .catch(() => (
      dispatch({
        type: LOGOUT_ERROR,
      })
    ));
};

export const toggleSidebar = createAction(TOGGLE_SIDEBAR);
