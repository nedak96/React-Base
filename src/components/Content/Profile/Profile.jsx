/**
 * @author Kaden Badalian
 *
 * @filename Profile.jsx
 * @date 6/2/20
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  Avatar,
  Paper,
  Typography,
  Divider,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '85%',
    padding: theme.spacing(2),
    overflow: 'auto',
  },
  avatar: {
    width: 160,
    height: 160,
    margin: theme.spacing(1, 0),
  },
  header: {
    margin: theme.spacing(1, 0),
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  button: {
    margin: theme.spacing(2, 2, 2, 0),
    textTransform: 'none',
  },
  textField: {
    margin: theme.spacing(1, 0),
    maxWidth: 400,
    width: '100%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  grid: {
    margin: theme.spacing(1, 0),
  },
  gridRow: {
    display: 'flex',
    alignItems: 'center',
    height: 40,
  },
}));

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const user = useSelector((state) => state.global.user);
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Avatar className={classes.avatar} src="https://picsum.photos/160" />
      <Typography component="h1" variant="h4" className={classes.header}>
        {`${user.firstName} ${user.lastName}`}
      </Typography>
      <Divider className={classes.divider} />
      <Typography component="h1" variant="h5" className={classes.header}>
        Information
      </Typography>
      {
        edit ? (
          <form>
            <Grid
              container
              spacing={1}
              className={classes.grid}
              alignItems="center"
            >
              <Grid item xs={12} md={6} lg={4}>
                <Typography color="primary">
                  First Name
                </Typography>
              </Grid>
              <Grid item xs={8} className={classes.gridRow}>
                <TextField
                  defaultValue={user.firstName}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Typography color="primary">
                  Last Name
                </Typography>
              </Grid>
              <Grid item xs={8} className={classes.gridRow}>
                <TextField
                  defaultValue={user.lastName}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Typography color="primary">
                  Email
                </Typography>
              </Grid>
              <Grid item xs={8} className={classes.gridRow}>
                <TextField
                  defaultValue={user.email}
                />
              </Grid>
            </Grid>
            <Button variant="outlined" onClick={() => setEdit(false)} className={classes.button}>
              Cancel
            </Button>
            <Button variant="outlined" className={classes.button}>
              Save
            </Button>
          </form>
        ) : (
          <>
            <Grid container spacing={1} className={classes.grid} alignItems="center">
              <Grid item xs={12} sm={4}>
                <Typography color="primary">
                  First Name
                </Typography>
              </Grid>
              <Grid item xs={8} className={classes.gridRow}>
                <Typography>
                  {user.firstName}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography color="primary">
                  Last Name
                </Typography>
              </Grid>
              <Grid item xs={8} className={classes.gridRow}>
                <Typography>
                  {user.lastName}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography color="primary">
                  Email
                </Typography>
              </Grid>
              <Grid item xs={8} className={classes.gridRow}>
                <Typography>
                  {user.email}
                </Typography>
              </Grid>
            </Grid>
            <Button variant="outlined" onClick={() => setEdit(true)} className={classes.button}>
              Edit
            </Button>
          </>
        )
      }
      <Divider className={classes.divider} />
      <Typography component="h1" variant="h5" className={classes.header}>
        Password
      </Typography>
      <form className={classes.form}>
        <PasswordTextField
          label="Old Password"
        />
        <PasswordTextField
          label="New Password"
        />
        <PasswordTextField
          label="Confirm New Password"
        />
        <Button variant="outlined" className={classes.button}>
          Change Password
        </Button>
      </form>
    </Paper>
  );
};

const PasswordTextField = ({ onChange, error, label }) => {
  const [hidden, setHidden] = useState(true);
  const classes = useStyles();

  return (
    <TextField
      className={classes.textField}
      required
      name={label}
      label={label}
      id={label}
      type={hidden ? 'password' : 'text'}
      error={error}
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setHidden(!hidden)}
              onMouseDown={(e) => e.preventDefault()}
            >
              {hidden ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

PasswordTextField.propTypes = {
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};

export default Profile;
