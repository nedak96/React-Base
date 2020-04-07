/**
 * @author Kaden Badalian
 *
 * @filename actionTypes.js
 * @date 4/7/20
 */

import React from 'react';
import { useDispatch } from 'react-redux';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Sidebar from './Sidebar';
import { toggleSidebar } from '../../redux/actions/globalActions';

const useStyles = makeStyles((theme) => ({
  header: {
    flexGrow: 1,
    backgroundColor: '#a63928',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
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
          <Typography variant="h6" className={classes.title}>
            My App
          </Typography>
        </Toolbar>
      </AppBar>
      <Sidebar />
    </>
  );
};

export default AppFrame;
