/**
 * @author Kaden Badalian
 *
 * @filename Sidebar.jsx
 * @date 4/7/20
 */

import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  ViewComfy as BrowseIcon,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { toggleSidebar } from '../../redux/actions/global';

const useStyles = makeStyles({
  sidebar: {
  },
  sidebarContent: {
    width: 300,
    margin: 10,
  },
});

const Sidebar = () => {
  const classes = useStyles();
  const sidebarOpen = useSelector((state) => state.global.sidebarOpen);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <Drawer
      anchor="left"
      open={sidebarOpen}
      onClose={() => dispatch(toggleSidebar())}
      className={classes.sidebar}
    >
      <div className={classes.sidebarContent}>
        <List>
          <ListItem
            button
            onClick={() => {
              history.push('/');
              dispatch(toggleSidebar());
            }}
          >
            <ListItemIcon>
              <MenuIcon />
            </ListItemIcon>
            <ListItemText>
              Home
            </ListItemText>
          </ListItem>
          <ListItem
            button
            onClick={() => {
              history.push('/browse');
              dispatch(toggleSidebar());
            }}
          >
            <ListItemIcon>
              <BrowseIcon />
            </ListItemIcon>
            <ListItemText>
              Browse
            </ListItemText>
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;
