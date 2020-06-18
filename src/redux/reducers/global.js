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
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_ERROR,
} from '../actions';

const defaultState = {
  validatingToken: true,
  sidebarOpen: false,
  authenticated: false,
  user: {},
  categories: [],
  fetchingCategories: true,
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
  [FETCH_CATEGORIES_SUCCESS]: (state, action) => ({
    ...state,
    fetchingCategories: false,
    categories: action.payload,
  }),
  [FETCH_CATEGORIES_ERROR]: (state) => ({
    ...state,
    fetchingCategories: false,
  }),
});

export default global;
