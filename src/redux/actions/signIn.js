/**
 * @author Kaden Badalian
 *
 * @filename signIn.js
 * @date 4/7/20
 */

import { createAction } from '@reduxjs/toolkit';
import {
  AUTHENTICATE_USER,
  AUTHENTICATE_USER_SUCCESS,
  AUTHENTICATE_USER_ERROR,
  SET_EMAIL_PASS_ERROR,
  CLEAN_SIGN_IN,
} from '../actions';
import { UNAUTHORIZED } from '../../constants/responseCodes';
import { $POST } from '../../utils/requests';

const usersAPI = '/api/v1/users';

export const authenticateUser = (email, password) => (dispatch) => {
  dispatch({
    type: AUTHENTICATE_USER,
  });
  return $POST(`${usersAPI}/authenticate-user`, { email, password })
    .then((res) => (
      dispatch({
        type: AUTHENTICATE_USER_SUCCESS,
        payload: res,
      })
    ))
    .catch((error) => (
      dispatch({
        type: AUTHENTICATE_USER_ERROR,
        payload: error.status === UNAUTHORIZED,
      })
    ));
};

export const setEmailPassError = createAction(SET_EMAIL_PASS_ERROR);

export const cleanSignIn = createAction(CLEAN_SIGN_IN);
