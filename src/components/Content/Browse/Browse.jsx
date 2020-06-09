/**
 * @author Kaden Badalian
 *
 * @filename Browse.jsx
 * @date 6/2/20
 */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
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
import InfiniteScroll from 'react-infinite-scroller';
import _ from 'lodash';
import shortid from 'shortid';
import { fetchItems, cleanBrowse } from '../../../redux/actions/browse';
import { PAGE_SIZE } from '../../../constants/browse';

const useStyles = makeStyles((theme) => ({
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
  loadingSkel: {
    height: '50px',
    marginTop: theme.spacing(2),
  },
}));

const LoadingElement = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={3} className={classes.grid}>
      {
        _.times(3, () => (
          <Grid item xs={4} key={shortid.generate()}>
            <Skeleton variant="rect" className={classes.loadingSkel} />
          </Grid>
        ))
      }
    </Grid>
  );
};

const Browse = () => {
  const classes = useStyles();
  const {
    items,
    fetchingItems,
    hasMore,
  } = useSelector((state) => state.browse);
  const dispatch = useDispatch();
  const location = useLocation();

  React.useEffect(() => () => dispatch(cleanBrowse()), [dispatch]);

  React.useEffect(() => {
    dispatch(fetchItems(0, PAGE_SIZE, location.search));
  }, [location, dispatch]);

  if (fetchingItems) {
    return (
      <Grid container spacing={3} className={classes.grid}>
        {
          _.times(6, () => (
            <Grid item xs={4} key={shortid.generate()}>
              <Skeleton variant="rect" className={classes.card} />
            </Grid>
          ))
        }
      </Grid>
    );
  }

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={(page) => dispatch(fetchItems(page * PAGE_SIZE, PAGE_SIZE), location.search)}
      hasMore={hasMore}
      initialLoad={false}
      loader={<LoadingElement key={shortid.generate()} />}
    >
      <Grid container spacing={3} className={classes.grid}>
        {
          items.map((item) => (
            <Grid item xs={4} key={item._id}>
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
    </InfiniteScroll>
  );
};

export default Browse;
