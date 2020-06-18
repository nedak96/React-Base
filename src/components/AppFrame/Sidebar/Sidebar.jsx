/**
 * @author Kaden Badalian
 *
 * @filename Sidebar.jsx
 * @date 4/7/20
 */

import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  SwipeableDrawer,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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
  contentLeftSlide: {
    animation: '.3s ease-in-out $slide-1 forwards',
  },
  contentRightSlide: {
    animation: '.3s ease-in-out $slide-2 forwards',
  },
  nextContentLeftSlide: {
    animation: '.3s ease-in-out $slide-2 reverse forwards',
  },
  nextContentRightSlide: {
    animation: '.3s ease-in-out $slide-1 reverse forwards',
  },
  '@keyframes slide-1': {
    '0%': {
      left: 0,
    },
    '100%': {
      left: -300,
    },
  },
  '@keyframes slide-2': {
    '0%': {
      left: 0,
    },
    '100%': {
      left: 300,
    },
  },
});

const Sidebar = () => {
  const classes = useStyles();
  const sidebarOpen = useSelector((state) => state.global.sidebarOpen);
  const dispatch = useDispatch();
  const [nextContentElement, setNextContentElement] = useState(null);
  const contentRef = useRef();
  const nextContentRef = useRef();

  const slide = React.useCallback((nextContent, direction) => {
    setNextContentElement(() => {
      switch (nextContent) {
        case 'Main':
          return <Main transition={slide} />;
        default:
          return <Category transition={slide} category={nextContent} />;
      }
    });
    if (direction === 'left') {
      contentRef.current.classList.add(classes.contentLeftSlide);
      nextContentRef.current.classList.add(classes.nextContentLeftSlide);
    } else {
      contentRef.current.classList.add(classes.contentRightSlide);
      nextContentRef.current.classList.add(classes.nextContentRightSlide);
    }
  }, [classes]);

  const [contentElement, setContentElement] = useState(<Main transition={slide} />);

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const animationEnded = React.useCallback(() => {
    contentRef.current.classList.remove(classes.contentLeftSlide);
    contentRef.current.classList.remove(classes.contentRightSlide);
    nextContentRef.current.classList.remove(classes.nextContentLeftSlide);
    nextContentRef.current.classList.remove(classes.nextContentRightSlide);
    setContentElement(nextContentElement);
    setNextContentElement(null);
  }, [classes, nextContentElement]);

  return (
    <SwipeableDrawer
      anchor="left"
      open={sidebarOpen}
      onClose={() => dispatch(toggleSidebar())}
      className={classes.sidebar}
    >
      <div className={classes.sidebarContent}>
        <div className={classes.content} ref={contentRef}>
          {contentElement}
        </div>
        <div
          className={classes.content}
          ref={nextContentRef}
          onAnimationEnd={animationEnded}
        >
          {nextContentElement}
        </div>
      </div>
    </SwipeableDrawer>
  );
};

export default Sidebar;
