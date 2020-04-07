/**
 * @author Kaden Badalian
 *
 * @filename actionTypes.js
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
import { toggleSidebar } from '../../redux/actions/globalActions';

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
  const sidebarOpen = useSelector((state) => state.globalReducer.sidebarOpen);
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
          <ListItem button onClick={() => history.push('/')}>
            <ListItemIcon>
              <MenuIcon />
            </ListItemIcon>
            <ListItemText>
              Home
            </ListItemText>
          </ListItem>
          <ListItem button onClick={() => history.push('/browse')}>
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
