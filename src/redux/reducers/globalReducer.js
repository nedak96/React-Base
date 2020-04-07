/**
 * @author Kaden Badalian
 *
 * @filename actionTypes.js
 * @date 4/7/20
 */

import { createReducer } from '@reduxjs/toolkit';
import {
  TOGGLE_SIDEBAR,
} from '../actionTypes';

const defaultState = {
  sidebarOpen: false,
};

const globalReducer = createReducer(defaultState, {
  [TOGGLE_SIDEBAR]: (state) => ({
    ...state,
    sidebarOpen: !state.sidebarOpen,
  }),
});

export default globalReducer;
