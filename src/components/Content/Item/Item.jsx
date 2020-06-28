/**
 * @author Kaden Badalian
 *
 * @filename Item.jsx
 * @date 6/23/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  CardContent,
  CardMedia,
  Typography,
  makeStyles,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { fetchItem, cleanItem } from '../../../redux/actions/item';
import SharePopup from './SharePopup';

const useStyles = makeStyles({
  media: {
    width: '100%',
    height: 200,
    pointerEvents: 'none',
  },
  fullDiv: {
    height: '100%',
    width: '100%',
    overflow: 'auto',
  },
});

const Item = ({ itemInfo }) => {
  const classes = useStyles();
  const { item, fetchingItem } = useSelector((state) => state.item);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchItem(itemInfo._id));
    return () => dispatch(cleanItem());
  }, [dispatch, itemInfo]);

  if (fetchingItem) {
    return (
      <div className={classes.fullDiv}>
        {
          itemInfo.image ? (
            <CardMedia
              image={itemInfo.image}
              className={classes.media}
            />
          ) : (
            <Skeleton variant="rect" className={classes.media} />
          )
        }
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {itemInfo.title || <Skeleton />}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {itemInfo.description || <Skeleton />}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <Skeleton />
          </Typography>
        </CardContent>
      </div>
    );
  }

  return (
    <div className={classes.fullDiv}>
      <CardMedia
        image={item.image}
        className={classes.media}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {item.title}
          <SharePopup itemId={itemInfo._id} title={item.title} />
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {`By ${item.author}`}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {item.description}
        </Typography>
      </CardContent>
    </div>
  );
};

Item.propTypes = {
  itemInfo: PropTypes.shape(PropTypes.any).isRequired,
};

export default Item;
