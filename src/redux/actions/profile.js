/**
 * @author Kaden Badalian
 *
 * @filename profile.js
 * @date 7/23/20
 */

import { createAction } from '@reduxjs/toolkit';
import {
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  SET_UPDATING_USER_STATUS,
} from '../actions';
import { $PUT } from '../../utils/requests';

const usersAPI = '/api/v1/users';

export const updateUser = (userId, newUser) => (dispatch) => {
  dispatch({
    type: UPDATE_USER,
  });
  return $PUT(`${usersAPI}/${userId}`, newUser)
    .then(() => (
      dispatch({
        type: UPDATE_USER_SUCCESS,
      })
    ))
    .catch(() => (
      dispatch({
        type: UPDATE_USER_ERROR,
      })
    ));
};

export const setUpdatingUserStatus = createAction(SET_UPDATING_USER_STATUS);
