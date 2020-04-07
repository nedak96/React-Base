/**
 * @author Kaden Badalian
 *
 * @filename actionTypes.js
 * @date 4/7/20
 */

import { combineReducers } from 'redux';
import browseReducer from './browseReducer';
import globalReducer from './globalReducer';
import homeReducer from './homeReducer';

const rootReducer = combineReducers({
  globalReducer,
  homeReducer,
  browseReducer,
});

export default rootReducer;
