/**
 * @author Kaden Badalian
 *
 * @filename browse.js
 * @date 6/2/20
 */

import { createReducer } from '@reduxjs/toolkit';
import {
  FETCH_ITEMS_SUCCESS,
  CLEAN_BROWSE,
} from '../actions';

const defaultState = {
  items: [],
  fetchingItems: true,
};

const browse = createReducer(defaultState, {
  [FETCH_ITEMS_SUCCESS]: (state, action) => ({
    ...state,
    items: action.payload,
    fetchingItems: false,
  }),
  [CLEAN_BROWSE]: (state) => ({
    ...state,
    items: [],
    fetchingItems: true,
  }),
});

export default browse;
