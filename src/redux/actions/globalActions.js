/**
 * @author Kaden Badalian
 *
 * @filename actionTypes.js
 * @date 4/7/20
 */

import { createAction } from '@reduxjs/toolkit';
import {
  TOGGLE_SIDEBAR,
} from '../actionTypes';

// eslint-disable-next-line import/prefer-default-export
export const toggleSidebar = createAction(TOGGLE_SIDEBAR);
