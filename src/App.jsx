/**
 * @author Kaden Badalian
 *
 * @filename actionTypes.js
 * @date 4/7/20
 */

import React from 'react';
import {
  ThemeProvider,
  CssBaseline,
  createMuiTheme,
} from '@material-ui/core';
import { Provider } from 'react-redux';
import Routes from './Routes';
import store from './redux/store';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  </Provider>
);

export default <App />;
