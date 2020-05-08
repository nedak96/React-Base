/**
 * @author Kaden Badalian
 *
 * @filename AppFrame.jsx
 * @date 4/7/20
 */

import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ProfileIcon from '@material-ui/icons/Person';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import Sidebar from './Sidebar';
import { toggleSidebar, logout } from '../../redux/actions/global';

const useStyles = makeStyles((theme) => ({
  header: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  grow: {
    flex: '1 1 auto',
  },
}));

const AppFrame = () => {
  const classes = useStyles();
  const authenticated = useSelector((state) => state.global.authenticated);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <IconButton
            edge="start"
            onClick={() => dispatch(toggleSidebar())}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.grow} />
          <Button
            className={classes.menuButton}
            variant="contained"
            startIcon={<ProfileIcon />}
            onClick={() => history.push(authenticated ? '/user' : '/sign_in')}
          >
            {authenticated ? 'Profile' : 'Sign In'}
          </Button>
          {
            authenticated ? (
              <Button
                variant="contained"
                startIcon={<LogoutIcon />}
                onClick={() => dispatch(logout())}
              >
                Logout
              </Button>
            ) : null
          }
        </Toolbar>
      </AppBar>
      <Sidebar />
    </>
  );
};

export default AppFrame;
