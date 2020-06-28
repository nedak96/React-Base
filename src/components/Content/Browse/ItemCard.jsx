/**
 * @author Kaden Badalian
 *
 * @filename Browse.jsx
 * @date 6/2/20
 */

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
  IconButton,
  makeStyles,
  Avatar,
  fade,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useSpring, animated, config } from 'react-spring';
import Item from '../Item';

const useStyles = makeStyles((theme) => ({
  card: {
    minHeight: 500,
    height: '100%',
    maxHeight: 600,
  },
  cardAction: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  media: {
    width: '100%',
    height: 200,
    pointerEvents: 'none',
  },
  fixedDiv: {
    position: 'fixed',
    backgroundColor: theme.palette.background.paper,
    maxWidth: 1280,
    left: 'max(calc((100vw - 1280px) / 2), 0px)',
    height: '100%',
    zIndex: 1,
    borderRadius: 4,
    overflow: 'hidden',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 0,
    margin: theme.spacing(1),
  },
  closeIcon: {
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
  },
  noScroll: {
    overflow: 'hidden',
  },
}));

const ItemCard = React.memo(({ item }) => {
  const classes = useStyles();
  const itemRef = useRef();
  const fixedDivRef = useRef();
  const [open, setOpen] = useState(false);
  const [shrinking, setShrinking] = useState(false);
  const [springProps, setSpringProps, springStop] = useSpring(() => ({}));

  const growDiv = () => {
    setOpen(true);
    document.body.classList.add(classes.noScroll);
    const position = itemRef.current.getBoundingClientRect();
    setSpringProps({
      top: 48,
      left: Math.max((window.innerWidth - 1280) / 2, 0),
      width: Math.min(window.innerWidth, 1280),
      height: window.innerHeight - 48,
      zIndex: 2,
      from: position,
      onRest: () => {
        fixedDivRef.current.style.left = '';
        fixedDivRef.current.style.width = '';
        fixedDivRef.current.style.height = '';
      },
      config: config.default,
      reset: true,
    });
  };

  const shrinkDiv = () => {
    setShrinking(true);
    const position = itemRef.current.getBoundingClientRect();
    document.body.classList.remove(classes.noScroll);
    window.addEventListener('scroll', springStop);
    setSpringProps({
      top: position.top,
      left: position.left,
      width: position.width,
      height: position.height,
      zIndex: 1,
      from: {
        top: 48,
        left: Math.max((window.innerWidth - 1280) / 2, 0),
        width: Math.min(window.innerWidth, 1280),
        height: window.innerHeight - 48,
      },
      onRest: () => {
        setOpen(false);
        setShrinking(false);
        window.removeEventListener('scroll', springStop);
      },
      config: config.default,
      reset: true,
    });
  };

  return (
    <>
      <Grid item xs={12} sm={4} md={3}>
        <Card
          className={classes.card}
          ref={itemRef}
        >
          <CardActionArea className={classes.cardAction} onClick={growDiv}>
            <CardMedia
              image={item.image}
              className={classes.media}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {item.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {item.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      {
        open ? (
          <animated.div
            style={springProps}
            className={classes.fixedDiv}
            ref={fixedDivRef}
          >
            {
              shrinking ? (
                <>
                  <CardMedia
                    image={item.image}
                    className={classes.media}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {item.description}
                    </Typography>
                  </CardContent>
                </>
              ) : (
                <>
                  <IconButton
                    className={classes.closeButton}
                    onClick={shrinkDiv}
                  >
                    <Avatar className={classes.closeIcon}>
                      <Close />
                    </Avatar>
                  </IconButton>
                  <Item itemInfo={item} />
                </>
              )
            }
          </animated.div>
        ) : null
      }
    </>
  );
});

ItemCard.propTypes = {
  item: PropTypes.shape(PropTypes.any).isRequired,
};

export default ItemCard;
