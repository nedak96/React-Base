/**
 * @author Kaden Badalian
 *
 * @filename SignIn.jsx
 * @date 4/25/20
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  IconButton,
  InputAdornment,
  Typography,
  Grid,
  Snackbar,
  Avatar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { authenticateUser, setEmailPassError, cleanSignIn } from '../../../redux/actions/signIn';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: Math.max(theme.breakpoints.values.xs, 444),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  afterButton: {
    fontSize: '.75rem',
  },
}));

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { emailPassError, signingIn } = useSelector((state) => state.signIn);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => () => dispatch(cleanSignIn()), [dispatch]);

  const checkFields = () => {
    if (!password) {
      setPasswordError(true);
    }
    if (!email) {
      setEmailError(true);
    } else if (password) {
      dispatch(authenticateUser(email, password, rememberMe));
    }
  };

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          error={emailError}
          onChange={(e) => {
            setEmail(e.target.value);
            if (emailError) {
              setEmailError(false);
            }
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          id="password"
          autoComplete="current-password"
          type={showPassword ? 'text' : 'password'}
          error={passwordError}
          onChange={(e) => {
            setPassword(e.target.value);
            if (passwordError) {
              setPasswordError(false);
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          disabled={signingIn}
          className={classes.submit}
          onClick={checkFields}
        >
          Sign In
        </Button>
        <Grid container justify="space-between">
          <Grid item>
            <Button
              onClick={() => history.push('/forgot_password')}
              size="small"
              className={classes.afterButton}
            >
              Forgot password?
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => history.push('/sign_up')}
              size="small"
              className={classes.afterButton}
            >
              {'Don\'t have an account? Sign Up'}
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={emailPassError}
        onClose={() => dispatch(setEmailPassError(false))}
        autoHideDuration={5000}
      >
        <Alert severity="error">Username/Password Incorrect</Alert>
      </Snackbar>
    </div>
  );
};

export default SignIn;
