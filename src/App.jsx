/**
 * @author Kaden Badalian
 *
 * @filename App.jsx
 * @date 4/7/20
 */

import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import {
  ThemeProvider,
  CssBaseline,
  createMuiTheme,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import Routes from './Routes';

const App = () => {
  const darkMode = useSelector((state) => state.localstorage.darkMode);
  const { isLoading } = useAuth0();

  const theme = useMemo(() => createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: { main: '#a63928' },
      secondary: { main: '#e0b234' },
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '*': {
            touchAction: 'manipulation',
          },
        },
      },
      MuiInputBase: {
        input: {
          letterSpacing: 'inherit',
        },
      },
      MuiOutlinedInput: {
        input: {
          '&:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0px 1000px #1b3f66 inset',
          },
        },
      },
    },
  }), [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {
        isLoading ? (
          <Backdrop open>
            <CircularProgress />
          </Backdrop>
        ) : <Routes />
      }
    </ThemeProvider>
  );
};

export default App;
