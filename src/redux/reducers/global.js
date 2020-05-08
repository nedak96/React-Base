/**
 * @author Kaden Badalian
 *
 * @filename global.js
 * @date 4/7/20
 */

import { createReducer } from '@reduxjs/toolkit';
import {
  TOGGLE_SIDEBAR,
  LOGOUT_SUCCESS,
  SESSION_FOUND,
  AUTHENTICATE_USER_SUCCESS,
  SESSION_NOT_FOUND,
} from '../actions';

const defaultState = {
  checkingSession: true,
  sidebarOpen: false,
  authenticated: false,
  user: {},
};

const global = createReducer(defaultState, {
  [TOGGLE_SIDEBAR]: (state) => ({
    ...state,
    sidebarOpen: !state.sidebarOpen,
  }),
  [LOGOUT_SUCCESS]: (state) => ({
    ...state,
    authenticated: false,
    user: {},
  }),
  [SESSION_FOUND]: (state, action) => ({
    ...state,
    authenticated: true,
    user: action.payload,
    checkingSession: false,
  }),
  [SESSION_NOT_FOUND]: (state) => ({
    ...state,
    checkingSession: false,
  }),
  [AUTHENTICATE_USER_SUCCESS]: (state, action) => ({
    ...state,
    authenticated: true,
    user: action.payload,
  }),
});

export default global;
