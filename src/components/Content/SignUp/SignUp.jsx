/**
 * @author Kaden Badalian
 *
 * @filename SignUp.jsx
 * @date 4/25/20
 */

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Button,
  TextField,
  Typography,
  Grid,
  Snackbar,
  Avatar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { createUser, setEmailError, cleanSignUp } from '../../../redux/actions/signUp';

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

const SignUp = () => {
  const classes = useStyles();
  const [information, setInformation] = useState({});
  const [errors, setErrors] = useState({});
  const { emailError, signingUp } = useSelector((state) => state.signUp);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => () => dispatch(cleanSignUp()), [dispatch]);

  const checkFields = () => {
    if (!information.firstName
      || !information.lastName
      || !information.email
      || !information.password
      || !information.confirmPassword
    ) {
      setErrors({
        ...errors,
        firstName: !information.firstName,
        lastName: !information.lastName,
        email: !information.email,
        password: !information.password,
        confirmPassword: !information.confirmPassword,
      });
    } else if (information.password !== information.confirmPassword) {
      setErrors({
        password: true,
        confirmPassword: true,
        passwordText: 'Passwords don\'t match',
      });
    } else {
      dispatch(createUser(information, history));
    }
  };

  return (
    <>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                error={errors.firstName}
                onChange={(e) => {
                  setInformation({ ...information, firstName: e.target.value });
                  if (errors.firstName) {
                    setErrors({ ...errors, firstName: false });
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                error={errors.lastName}
                onChange={(e) => {
                  setInformation({ ...information, lastName: e.target.value });
                  if (errors.lastName) {
                    setErrors({ ...errors, lastName: false });
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={errors.email}
                onChange={(e) => {
                  setInformation({ ...information, email: e.target.value });
                  if (errors.email) {
                    setErrors({ ...errors, email: false });
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                error={errors.password}
                helperText={errors.passwordText}
                onChange={(e) => {
                  setInformation({ ...information, password: e.target.value });
                  if (errors.passwordText) {
                    setErrors({
                      ...errors,
                      password: false,
                      confirmPassword: false,
                      passwordText: undefined,
                    });
                  } else if (errors.password) {
                    setErrors({ ...errors, password: false });
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                error={errors.confirmPassword}
                helperText={errors.passwordText}
                onChange={(e) => {
                  setInformation({ ...information, confirmPassword: e.target.value });
                  if (errors.passwordText) {
                    setErrors({
                      ...errors,
                      password: false,
                      confirmPassword: false,
                      passwordText: undefined,
                    });
                  } else if (errors.confirmPassword) {
                    setErrors({ ...errors, confirmPassword: false });
                  }
                }}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={signingUp}
            onClick={checkFields}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button
                onClick={() => history.push('/sign_in')}
                size="small"
                className={classes.afterButton}
              >
                Already have an account? Sign in
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <Snackbar
        open={emailError}
        onClose={() => dispatch(setEmailError(false))}
        autoHideDuration={5000}
      >
        <Alert severity="error">Email Already in Use</Alert>
      </Snackbar>
    </>
  );
};

export default SignUp;
