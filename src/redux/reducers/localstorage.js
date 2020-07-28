/**
 * @author Kaden Badalian
 *
 * @filename localstorage.js
 * @date 4/8/20
 */

import { createReducer } from '@reduxjs/toolkit';
import {
  TOGGLE_DARK_MODE,
} from '../actions';

const defaultState = {
  darkMode: true,
};

const localstorage = createReducer(defaultState, {
  [TOGGLE_DARK_MODE]: (state) => ({
    ...state,
    darkMode: !state.darkMode,
  }),
});

export default localstorage;
