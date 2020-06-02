/**
 * @author Kaden Badalian
 *
 * @filename App.jsx
 * @date 4/7/20
 */

import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ThemeProvider,
  CssBaseline,
  createMuiTheme,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import Routes from './Routes';
import { validateToken } from './redux/actions/global';

const App = () => {
  const validatingToken = useSelector((state) => state.global.validatingToken);
  const darkMode = useSelector((state) => state.localstorage.darkMode);
  const dispatch = useDispatch();

  const theme = useMemo(() => createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: { main: '#a63928' },
      secondary: { main: '#e0b234' },
    },
    overrides: {
      MuiOutlinedInput: {
        input: {
          '&:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0px 1000px #1b3f66 inset',
          },
        },
      },
    },
  }), [darkMode]);

  useEffect(() => {
    dispatch(validateToken());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {
        validatingToken ? (
          <Backdrop open>
            <CircularProgress />
          </Backdrop>
        ) : <Routes />
      }
    </ThemeProvider>
  );
};

export default App;
