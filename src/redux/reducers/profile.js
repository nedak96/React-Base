/**
 * @author Kaden Badalian
 *
 * @filename signIn.js
 * @date 4/7/20
 */

import { createReducer } from '@reduxjs/toolkit';
import {
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  SET_UPDATING_USER_STATUS,
} from '../actions';

const defaultState = {
  updatingUserStatus: '',
};

const profile = createReducer(defaultState, {
  [UPDATE_USER]: (state) => ({
    ...state,
    updatingUserStatus: 'updating',
  }),
  [UPDATE_USER_SUCCESS]: (state) => ({
    ...state,
    updatingUserStatus: 'success',
  }),
  [UPDATE_USER_ERROR]: (state) => ({
    ...state,
    updatingUserStatus: 'error',
  }),
  [SET_UPDATING_USER_STATUS]: (state, action) => ({
    ...state,
    updatingUserStatus: action.payload,
  }),
});

export default profile;
