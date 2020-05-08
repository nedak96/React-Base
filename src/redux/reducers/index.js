import { combineReducers } from 'redux';
import global from './global';
import signIn from './signIn';
import signUp from './signUp';
import localstorage from './localstorage';

const rootReducer = () => combineReducers({
  global,
  signIn,
  signUp,
  localstorage,
});

export default rootReducer;
