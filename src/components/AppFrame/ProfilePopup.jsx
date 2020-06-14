/**
 * @author Kaden Badalian
 *
 * @filename ProfilePopup.jsx
 * @date 6/1/20
 */

import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
} from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles';
import ProfileIcon from '@material-ui/icons/Person';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import DarkIcon from '@material-ui/icons/Brightness4';
import { logout, toggleDarkMode } from '../../redux/actions/global';

const useStyles = makeStyles((theme) => ({
  profileIcon: {
    backgroundColor: theme.palette.primary.light,
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
  },
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
    padding: 0,
  },
}));

const ProfilePopup = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef();
  const authenticated = useSelector((state) => state.global.authenticated);
  const { firstName, lastName } = useSelector((state) => state.global.user);
  const darkMode = useSelector((state) => state.localstorage.darkMode);
  const dispatch = useDispatch();
  const history = useHistory();

  // Preloads image
  React.useEffect(() => {
    (new Image()).src = 'https://picsum.photos/80';
  }, []);

  const logoutOnClick = () => {
    setOpen(false);
    dispatch(logout());
  };

  const profileOnClick = () => {
    setOpen(false);
    history.push('/user');
  };

  const darkModeOnClick = () => {
    dispatch(toggleDarkMode());
  };

  const signInOnClick = () => {
    setOpen(false);
    history.push('/sign_in');
  };

  return (
    <>
      <IconButton
        className={classes.profileIconButton}
        onClick={() => setOpen(true)}
        ref={anchorRef}
        color="secondary"
      >
        <Avatar className={classes.profileIcon}>
          <ProfileIcon />
        </Avatar>
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
                  authenticated ? (
                    <>
                      <Avatar
                        className={classes.avatar}
                        src="https://picsum.photos/80"
                      />
                      <Typography variant="h6">
                        {`${firstName} ${lastName}`}
                      </Typography>
                      <Button
                        className={classes.button}
                        variant="outlined"
                        fullWidth
                        startIcon={(
                          <Avatar className={classes.buttonIcon}>
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
                          <Avatar className={classes.buttonIcon}>
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
                          <Avatar className={classes.buttonIcon}>
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
                      onClick={signInOnClick}
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
