/**
 * @author Kaden Badalian
 *
 * @filename item.js
 * @date 6/23/20
 */

import { createReducer } from '@reduxjs/toolkit';
import {
  FETCH_ITEM_SUCCESS,
  CLEAN_ITEM,
} from '../actions';

const defaultState = {
  item: {},
  fetchingItem: true,
};

const item = createReducer(defaultState, {
  [FETCH_ITEM_SUCCESS]: (state, action) => ({
    ...state,
    item: action.payload,
    fetchingItem: false,
  }),
  [CLEAN_ITEM]: (state) => ({
    ...state,
    item: {},
    fetchingItem: true,
  }),
});

export default item;
