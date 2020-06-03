/**
 * @author Kaden Badalian
 *
 * @filename Browse.jsx
 * @date 6/2/20
 */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import { fetchItems, cleanBrowse } from '../../../redux/actions/browse';

const useStyles = makeStyles(() => ({
  card: {
    minHeight: '500px',
    height: '100%',
    maxHeight: '600px',
  },
  cardAction: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  media: {
    width: '100%',
    height: '300px',
  },
  grid: {
    width: '100%',
  },
  loadingDiv: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
}));

const Browse = () => {
  const classes = useStyles();
  const { items, fetchingItems } = useSelector((state) => state.browse);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchItems());
    return () => {
      dispatch(cleanBrowse());
    };
  }, [dispatch]);

  if (fetchingItems) {
    return (
      <Grid container spacing={3} className={classes.grid}>
        {
          _.times(6, () => (
            <Grid item xs={4}>
              <Skeleton variant="rect" className={classes.card} />
            </Grid>
          ))
        }
      </Grid>
    );
  }

  return (
    <Grid container spacing={3} className={classes.grid}>
      {
        items.map((item) => (
          <Grid item xs={4}>
            <Card className={classes.card}>
              <CardActionArea className={classes.cardAction}>
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
        ))
      }
    </Grid>
  );
};

export default Browse;
