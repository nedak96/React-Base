/**
 * @author Kaden Badalian
 *
 * @filename signIn.js
 * @date 4/7/20
 */

import { createReducer } from '@reduxjs/toolkit';
import {
  AUTHENTICATE_USER,
  AUTHENTICATE_USER_ERROR,
  SET_EMAIL_PASS_ERROR,
  CLEAN_SIGN_IN,
  AUTHENTICATE_USER_SUCCESS,
} from '../actions';

const defaultState = {
  signingIn: false,
  emailPassError: false,
};

const signIn = createReducer(defaultState, {
  [AUTHENTICATE_USER]: (state) => ({
    ...state,
    signingIn: true,
  }),
  [AUTHENTICATE_USER_SUCCESS]: (state) => ({
    ...state,
    signingIn: false,
  }),
  [AUTHENTICATE_USER_ERROR]: (state, action) => ({
    ...state,
    signingIn: false,
    emailPassError: action.payload,
  }),
  [SET_EMAIL_PASS_ERROR]: (state, action) => ({
    ...state,
    emailPassError: action.payload,
  }),
  [CLEAN_SIGN_IN]: (state) => ({
    ...state,
    signingIn: false,
    emailPassError: false,
  }),
});

export default signIn;
