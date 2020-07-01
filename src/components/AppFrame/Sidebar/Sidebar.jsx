/**
 * @author Kaden Badalian
 *
 * @filename Sidebar.jsx
 * @date 4/7/20
 */

import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  SwipeableDrawer,
  makeStyles,
} from '@material-ui/core';
import { useTransition, animated } from 'react-spring';
import { toggleSidebar, fetchCategories } from '../../../redux/actions/global';
import Main from './Main';
import Category from './Category';

const useStyles = makeStyles({
  sidebarContent: {
    width: 300,
  },
  content: {
    top: 0,
    position: 'absolute',
    width: '100%',
    padding: 10,
  },
});

const Sidebar = () => {
  const classes = useStyles();
  const sidebarOpen = useSelector((state) => state.global.sidebarOpen);
  const dispatch = useDispatch();
  const [[content, direction], setContent] = useState(['Main', 'left']);

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const transitions = useTransition(content, (key) => key, {
    from: {
      transform: `translateX(${direction === 'left' ? 100 : -100}%)`,
    },
    enter: {
      transform: 'translateX(0%)',
    },
    leave: {
      transform: `translateX(${direction === 'left' ? -100 : 100}%)`,
    },
  });

  const slide = useCallback((nextContent, swipeDirection) => (
    setContent([nextContent, swipeDirection])
  ), []);

  const getContent = useCallback((contentName) => {
    switch (contentName) {
      case 'Main':
        return <Main transition={slide} />;
      default:
        return <Category transition={slide} category={contentName} />;
    }
  }, [slide]);

  return (
    <SwipeableDrawer
      anchor="left"
      open={sidebarOpen}
      onClose={() => dispatch(toggleSidebar())}
    >
      <div className={classes.sidebarContent}>
        {
          transitions.map(({ item, key, props }) => (
            <animated.div style={props} key={key} className={classes.content}>
              {getContent(item)}
            </animated.div>
          ))
        }
      </div>
    </SwipeableDrawer>
  );
};

export default Sidebar;
