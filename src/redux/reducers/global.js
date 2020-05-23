/**
 * @author Kaden Badalian
 *
 * @filename global.js
 * @date 4/7/20
 */

import { createReducer } from '@reduxjs/toolkit';
import {
  TOGGLE_SIDEBAR,
  TOKEN_VALID,
  AUTHENTICATE_USER_SUCCESS,
  LOGOUT,
  TOKEN_NOT_VALID,
} from '../actions';

const defaultState = {
  validatingToken: true,
  sidebarOpen: false,
  authenticated: false,
  user: {},
};

const global = createReducer(defaultState, {
  [TOGGLE_SIDEBAR]: (state) => ({
    ...state,
    sidebarOpen: !state.sidebarOpen,
  }),
  [LOGOUT]: (state) => ({
    ...state,
    authenticated: false,
    user: {},
  }),
  [TOKEN_VALID]: (state, action) => ({
    ...state,
    authenticated: true,
    user: action.payload,
    validatingToken: false,
  }),
  [TOKEN_NOT_VALID]: (state) => ({
    ...state,
    validatingToken: false,
  }),
  [AUTHENTICATE_USER_SUCCESS]: (state, action) => ({
    ...state,
    authenticated: true,
    user: action.payload.user,
  }),
});

export default global;
