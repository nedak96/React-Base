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
  FETCH_ITEMS,
} from '../actions';
import { PAGE_SIZE } from '../../constants/browse';

const defaultState = {
  items: [],
  fetchingItems: true,
  hasMore: true,
};

const browse = createReducer(defaultState, {
  [FETCH_ITEMS]: (state, action) => ({
    ...state,
    items: action.payload.clear ? [] : state.items,
    fetchingItems: action.payload.clear ? true : state.fetchingItems,
  }),
  [FETCH_ITEMS_SUCCESS]: (state, action) => ({
    ...state,
    items: [
      ...state.items,
      ...action.payload,
    ],
    fetchingItems: false,
    hasMore: action.payload.length === PAGE_SIZE,
  }),
  [CLEAN_BROWSE]: (state) => ({
    ...state,
    items: [],
    fetchingItems: true,
  }),
});

export default browse;
