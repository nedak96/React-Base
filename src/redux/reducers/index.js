import { combineReducers } from 'redux';
import global from './global';
import localstorage from './localstorage';
import browse from './browse';
import item from './item';
import profile from './profile';

const rootReducer = () => combineReducers({
  global,
  localstorage,
  browse,
  item,
  profile,
});

export default rootReducer;
