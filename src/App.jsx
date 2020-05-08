/**
 * @author Kaden Badalian
 *
 * @filename App.jsx
 * @date 4/7/20
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ThemeProvider,
  CssBaseline,
  createMuiTheme,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import Routes from './Routes';
import { checkSession } from './redux/actions/global';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
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
});

const App = () => {
  const checkingSession = useSelector((state) => state.global.checkingSession);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {
        checkingSession ? (
          <Backdrop open>
            <CircularProgress />
          </Backdrop>
        ) : <Routes />
      }
    </ThemeProvider>
  );
};

export default App;
