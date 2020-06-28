/**
 * @author Kaden Badalian
 *
 * @filename browse.js
 * @date 6/2/20
 */

import { createAction } from '@reduxjs/toolkit';
import {
  FETCH_ITEM,
  FETCH_ITEM_SUCCESS,
  FETCH_ITEM_ERROR,
  CLEAN_ITEM,
} from '../actions';
import { $GET } from '../../utils/requests';

const itemsAPI = '/api/v1/items';

export const fetchItem = (id) => (dispatch) => {
  dispatch({
    type: FETCH_ITEM,
  });
  return $GET(`${itemsAPI}/${id}`)
    .then((res) => (
      dispatch({
        type: FETCH_ITEM_SUCCESS,
        payload: res,
      })
    ))
    .catch(() => (
      dispatch({
        type: FETCH_ITEM_ERROR,
      })
    ));
};

export const cleanItem = createAction(CLEAN_ITEM);
