/**
 * @author Kaden Badalian
 *
 * @filename localstorage.js
 * @date 4/8/20
 */

import { createReducer } from '@reduxjs/toolkit';
import {
  LOGOUT,
  VALIDATE_TOKEN_ERROR,
  TOKEN_NOT_VALID,
  SET_TOKEN,
} from '../actions';

const defaultState = {
  token: '',
};

const localstorage = createReducer(defaultState, {
  [LOGOUT]: (state) => ({
    ...state,
    token: '',
  }),
  [VALIDATE_TOKEN_ERROR]: (state) => ({
    ...state,
    token: '',
  }),
  [TOKEN_NOT_VALID]: (state) => ({
    ...state,
    token: '',
  }),
  [SET_TOKEN]: (state, action) => ({
    ...state,
    token: action.payload,
  }),
});

export default localstorage;
