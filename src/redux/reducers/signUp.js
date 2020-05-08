/**
 * @author Kaden Badalian
 *
 * @filename signUp.js
 * @date 4/7/20
 */

import { createReducer } from '@reduxjs/toolkit';
import {
  SET_EMAIL_ERROR,
  CREATE_USER_ERROR,
  CLEAN_SIGN_UP,
  CREATE_USER,
  CREATE_USER_SUCCESS,
} from '../actions';

const defaultState = {
  emailError: false,
  signingUp: false,
};

const signUp = createReducer(defaultState, {
  [CREATE_USER]: (state) => ({
    ...state,
    signingUp: true,
  }),
  [CREATE_USER_SUCCESS]: (state) => ({
    ...state,
    signingUp: false,
  }),
  [CREATE_USER_ERROR]: (state, action) => ({
    ...state,
    emailError: action.payload,
    signingUp: false,
  }),
  [SET_EMAIL_ERROR]: (state, action) => ({
    ...state,
    emailError: action.payload,
  }),
  [CLEAN_SIGN_UP]: (state) => ({
    ...state,
    emailError: false,
    signingUp: false,
  }),
});

export default signUp;
