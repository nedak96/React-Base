/**
 * @author Kaden Badalian
 *
 * @filename Category.jsx
 * @date 6/17/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  List,
  ListItem,
  Divider,
  ListItemIcon,
  ListItemText,
  Breadcrumbs,
  Chip,
  makeStyles,
} from '@material-ui/core';
import { ArrowBackIos } from '@material-ui/icons';
import { toggleSidebar } from '../../../redux/actions/global';

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(1, 0),
  },
  breadcrumbs: {
    margin: theme.spacing(1.5, 0, 0, 0),
  },
  chip: {
    margin: theme.spacing(0.5, 0),
  },
}));

const Category = ({ transition, category }) => {
  const categories = useSelector((state) => state.global.categories);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const path = React.useMemo(() => {
    const retPath = [];
    const buildPath = (id) => {
      retPath.unshift(id);
      if (id !== 'Browse') {
        buildPath(categories[id].parentId);
      }
    };
    buildPath(category);
    return retPath;
  }, [categories, category]);

  return (
    <>
      <List>
        <ListItem
          button
          onClick={() => {
            transition('Main', 'right');
          }}
        >
          <ListItemIcon>
            <ArrowBackIos />
          </ListItemIcon>
          <ListItemText>
            Main Menu
          </ListItemText>
        </ListItem>
      </List>
      <Divider className={classes.divider} />
      <Breadcrumbs className={classes.breadcrumbs}>
        {
          path.map((cat) => (
            <Chip
              key={cat}
              label={categories[cat].name}
              onClick={() => {
                if (category !== cat) {
                  transition(cat, 'right');
                }
              }}
              className={classes.chip}
            />
          ))
        }
      </Breadcrumbs>
      <List>
        {
          categories[category].children.map((child) => (
            <ListItem
              key={child}
              button
              onClick={() => {
                if (Array.isArray(categories[child].children)
                  && categories[child].children.length) {
                  return transition(child, 'left');
                }
                history.push(`/browse?category=${child}`);
                return dispatch(toggleSidebar());
              }}
            >
              <ListItemText>
                {categories[child].name}
              </ListItemText>
            </ListItem>
          ))
        }
        <ListItem
          button
          onClick={() => {
            if (category !== 'Browse') {
              history.push(`/browse?category=${category}`);
            } else {
              history.push('/browse');
            }
            dispatch(toggleSidebar());
          }}
        >
          <ListItemText>
            All
          </ListItemText>
        </ListItem>
      </List>
    </>
  );
};

Category.propTypes = {
  transition: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
};

export default Category;
