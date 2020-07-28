/**
 * @author Kaden Badalian
 *
 * @filename ProfilePopup.jsx
 * @date 6/1/20
 */

import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import {
  IconButton,
  Button,
  Popper,
  ClickAwayListener,
  Grow,
  Paper,
  Avatar,
  Typography,
  Switch,
  makeStyles,
} from '@material-ui/core';
import ProfileIcon from '@material-ui/icons/Person';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import DarkIcon from '@material-ui/icons/Brightness4';
import { toggleDarkMode } from '../../redux/actions/global';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(0.5, 1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 300,
    maxHeight: 400,
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  avatar: {
    margin: theme.spacing(1),
    width: 80,
    height: 80,
  },
  button: {
    justifyContent: 'left',
    textTransform: 'none',
    fontSize: '1rem',
    margin: theme.spacing(0.5, 1),
  },
  buttonIcon: {
    width: '1.5em',
    height: '1.5em',
  },
  endIcon: {
    marginLeft: 'auto',
  },
  profileIconButton: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
  profileIcon: {
    position: 'absolute',
    color: theme.palette.background.default,
  },
}));

const ProfilePopup = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef();
  const {
    isAuthenticated,
    user,
    logout,
    loginWithRedirect,
  } = useAuth0();
  const darkMode = useSelector((state) => state.localstorage.darkMode);
  const dispatch = useDispatch();
  const history = useHistory();

  const logoutOnClick = () => {
    setOpen(false);
    logout();
  };

  const profileOnClick = () => {
    setOpen(false);
    history.push('/user');
  };

  const darkModeOnClick = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <>
      <IconButton
        className={classes.profileIconButton}
        onClick={() => setOpen(true)}
        ref={anchorRef}
      >
        <ProfileIcon className={classes.profileIcon} />
      </IconButton>
      <Popper
        open={open}
        placement="bottom-end"
        anchorEl={anchorRef.current}
        transition
        disablePortal
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={() => setOpen(false)}>
            <Grow in={open} {...TransitionProps}>
              <Paper className={classes.paper}>
                {
                  isAuthenticated ? (
                    <>
                      <Avatar
                        className={classes.avatar}
                        src={user.picture}
                      />
                      <Typography variant="h6">
                        {`${user.name}`}
                      </Typography>
                      <Button
                        className={classes.button}
                        variant="outlined"
                        fullWidth
                        startIcon={(
                          <Avatar
                            variant="rounded"
                            className={classes.buttonIcon}
                          >
                            <ProfileIcon />
                          </Avatar>
                        )}
                        onClick={profileOnClick}
                      >
                        Profile
                      </Button>
                      <Button
                        classes={{
                          root: classes.button,
                          endIcon: classes.endIcon,
                        }}
                        variant="outlined"
                        fullWidth
                        startIcon={(
                          <Avatar
                            variant="rounded"
                            className={classes.buttonIcon}
                          >
                            <DarkIcon />
                          </Avatar>
                        )}
                        endIcon={<Switch color="primary" checked={darkMode} />}
                        onClick={darkModeOnClick}
                      >
                        Dark Mode
                      </Button>
                      <Button
                        className={classes.button}
                        variant="outlined"
                        fullWidth
                        startIcon={(
                          <Avatar
                            variant="rounded"
                            className={classes.buttonIcon}
                          >
                            <LogoutIcon />
                          </Avatar>
                        )}
                        onClick={logoutOnClick}
                      >
                        Log Out
                      </Button>
                    </>
                  ) : (
                    <Button
                      className={classes.button}
                      variant="outlined"
                      fullWidth
                      startIcon={(
                        <Avatar className={classes.buttonIcon}>
                          <ProfileIcon />
                        </Avatar>
                      )}
                      onClick={() => loginWithRedirect()}
                    >
                      Sign In
                    </Button>
                  )
                }
              </Paper>
            </Grow>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
};

export default ProfilePopup;
