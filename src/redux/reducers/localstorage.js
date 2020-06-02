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
  TOGGLE_DARK_MODE,
} from '../actions';

const defaultState = {
  token: '',
  darkMode: true,
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
  [TOGGLE_DARK_MODE]: (state) => ({
    ...state,
    darkMode: !state.darkMode,
  }),
});

export default localstorage;
