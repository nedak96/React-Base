/**
 * @author Kaden Badalian
 *
 * @filename browse.js
 * @date 6/2/20
 */

import { createAction } from '@reduxjs/toolkit';
import {
  FETCH_ITEMS,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_ERROR,
  CLEAN_BROWSE,
} from '../actions';
import { $GET } from '../../utils/requests';

const itemsAPI = 'api/v1/items';

export const fetchItems = (skip, limit) => (dispatch) => {
  dispatch({
    type: FETCH_ITEMS,
  });
  return $GET(`${itemsAPI}/?skip=${skip}&limit=${limit}`)
    .then((res) => (
      dispatch({
        type: FETCH_ITEMS_SUCCESS,
        payload: res.docs,
      })
    ))
    .catch(() => (
      dispatch({
        type: FETCH_ITEMS_ERROR,
      })
    ));
};

export const cleanBrowse = createAction(CLEAN_BROWSE);
