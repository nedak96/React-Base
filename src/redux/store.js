/**
 * @author Kaden Badalian
 *
 * @filename store.js
 * @date 4/7/20
 */

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import localstorage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage: localstorage,
  whitelist: [
    'localstorage',
  ],
};
const persistedReducer = persistReducer(persistConfig, rootReducer());

const store = configureStore(
  {
    reducer: persistedReducer,
    middleware: [thunk],
  },
);

export const persistor = persistStore(store);

export default store;
