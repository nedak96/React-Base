/**
 * @author Kaden Badalian
 *
 * @filename AppFrame.jsx
 * @date 4/7/20
 */

import React from 'react';
import { useDispatch } from 'react-redux';
import {
  AppBar,
  Toolbar,
  IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Sidebar from './Sidebar';
import ProfilePopup from './ProfilePopup';
import Search from './Search';
import { toggleSidebar } from '../../redux/actions/global';

const useStyles = makeStyles((theme) => ({
  header: {
    position: 'fixed',
    flexGrow: 1,
    top: 0,
  },
  toolbar: {
    minHeight: 48,
    height: 48,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    width: 40,
    height: 40,
    borderRadius: 4,
  },
  title: {
    flexGrow: 1,
  },
  grow: {
    flex: '1 1 auto',
  },
  menuButtonIcon: {
    position: 'absolute',
    color: theme.palette.background.default,
  },
}));

const AppFrame = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <>
      <AppBar position="static" className={classes.header}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            onClick={() => dispatch(toggleSidebar())}
            className={classes.menuButton}
          >
            <MenuIcon className={classes.menuButtonIcon} />
          </IconButton>
          <div className={classes.grow} />
          <Search />
          <ProfilePopup />
        </Toolbar>
      </AppBar>
      <Sidebar />
    </>
  );
};

export default AppFrame;
