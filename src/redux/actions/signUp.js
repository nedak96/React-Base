/**
 * @author Kaden Badalian
 *
 * @filename signUp.js
 * @date 4/7/20
 */

import { createAction } from '@reduxjs/toolkit';
import {
  SET_EMAIL_ERROR,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  CLEAN_SIGN_UP,
} from '../actions';
import { $POST } from '../../utils/requests';

const usersAPI = '/api/v1/users';

export const createUser = (information, history) => (dispatch) => {
  dispatch({
    type: CREATE_USER,
  });
  return $POST(`${usersAPI}/create-user`, { ...information })
    .then(() => {
      history.push('/');
      return dispatch({
        type: CREATE_USER_SUCCESS,
      });
    })
    .catch((error) => (
      dispatch({
        type: CREATE_USER_ERROR,
        payload: error.name === 'EMAIL_EXISTS_ERROR',
      })
    ));
};

export const setEmailError = createAction(SET_EMAIL_ERROR);

export const cleanSignUp = createAction(CLEAN_SIGN_UP);
