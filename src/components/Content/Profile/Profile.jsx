/**
 * @author Kaden Badalian
 *
 * @filename Profile.jsx
 * @date 6/2/20
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Avatar,
  Paper,
  Typography,
  Divider,
  Button,
  TextField,
  Grid,
  Snackbar,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { updateUser, setUpdatingUserStatus } from '../../../redux/actions/profile';

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
  const [newUser, setNewUser] = useState({});
  const { user, getAccessTokenSilently } = useAuth0();
  const updatingUserStatus = useSelector((state) => state.profile.updatingUserStatus);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (updatingUserStatus === 'success') {
      // Update user object for current instance
      Object.keys(newUser).forEach((prop) => { user[prop] = newUser[prop]; });
      // Update tokens in localStorage
      getAccessTokenSilently({
        ignoreCache: true,
      });
      setEdit(false);
    }
  }, [updatingUserStatus, user, newUser, getAccessTokenSilently]);

  return (
    <>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar} src={user.picture} />
        <Typography component="h1" variant="h4" className={classes.header}>
          {`${user.given_name || ''} ${user.family_name || ''}`}
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
                    defaultValue={user.given_name}
                    onChange={(e) => setNewUser({ ...newUser, given_name: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Typography color="primary">
                    Last Name
                  </Typography>
                </Grid>
                <Grid item xs={8} className={classes.gridRow}>
                  <TextField
                    defaultValue={user.family_name}
                    onChange={(e) => setNewUser({ ...newUser, family_name: e.target.value })}
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
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  />
                </Grid>
              </Grid>
              <Button
                variant="outlined"
                onClick={() => setEdit(false)}
                className={classes.button}
                disabled={updatingUserStatus === 'updating'}
              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                onClick={() => dispatch(updateUser(user.sub, newUser))}
                className={classes.button}
                disabled={updatingUserStatus === 'updating'}
              >
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
                    {user.given_name}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography color="primary">
                    Last Name
                  </Typography>
                </Grid>
                <Grid item xs={8} className={classes.gridRow}>
                  <Typography>
                    {user.family_name}
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
      </Paper>
      <Snackbar
        open={updatingUserStatus === 'success'}
        onClose={() => dispatch(setUpdatingUserStatus(''))}
        autoHideDuration={5000}
      >
        <Alert severity="success">User updated successfully</Alert>
      </Snackbar>
      <Snackbar
        open={updatingUserStatus === 'error'}
        onClose={() => dispatch(setUpdatingUserStatus(''))}
        autoHideDuration={5000}
      >
        <Alert severity="error">Error updating user</Alert>
      </Snackbar>
    </>
  );
};

export default Profile;
