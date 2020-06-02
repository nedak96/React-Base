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
import { toggleSidebar } from '../../redux/actions/global';

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
  const dispatch = useDispatch();

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
          <ProfilePopup />
        </Toolbar>
      </AppBar>
      <Sidebar />
    </>
  );
};

export default AppFrame;
