/**
 * @author Kaden Badalian
 *
 * @filename global.js
 * @date 4/7/20
 */

import { createReducer } from '@reduxjs/toolkit';
import {
  TOGGLE_SIDEBAR,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_ERROR,
} from '../actions';

const defaultState = {
  validatingToken: true,
  sidebarOpen: false,
  categories: [],
  fetchingCategories: true,
};

const global = createReducer(defaultState, {
  [TOGGLE_SIDEBAR]: (state) => ({
    ...state,
    sidebarOpen: !state.sidebarOpen,
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
