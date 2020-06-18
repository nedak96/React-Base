/**
 * @author Kaden Badalian
 *
 * @filename Main.jsx
 * @date 6/17/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  ViewComfy as BrowseIcon,
} from '@material-ui/icons';
import Skeleton from '@material-ui/lab/Skeleton';
import { toggleSidebar } from '../../../redux/actions/global';

const useStyles = makeStyles({
  categorySkel: {
    height: 48,
  },
});

const Main = ({ transition }) => {
  const fetchingCategories = useSelector((state) => state.global.fetchingCategories);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  return (
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
      {
        fetchingCategories ? (
          <Skeleton variant="rect" className={classes.categorySkel} />
        ) : (
          <ListItem
            button
            onClick={() => {
              transition('Browse', 'left');
            }}
          >
            <ListItemIcon>
              <BrowseIcon />
            </ListItemIcon>
            <ListItemText>
              Browse
            </ListItemText>
          </ListItem>
        )
      }
    </List>
  );
};

Main.propTypes = {
  transition: PropTypes.func.isRequired,
};

export default Main;
