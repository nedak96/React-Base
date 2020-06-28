import { combineReducers } from 'redux';
import global from './global';
import signIn from './signIn';
import signUp from './signUp';
import localstorage from './localstorage';
import browse from './browse';
import item from './item';

const rootReducer = () => combineReducers({
  global,
  signIn,
  signUp,
  localstorage,
  browse,
  item,
});

export default rootReducer;
