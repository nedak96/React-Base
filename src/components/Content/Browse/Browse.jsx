/**
 * @author Kaden Badalian
 *
 * @filename Browse.jsx
 * @date 6/2/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  Grid,
  useMediaQuery,
  makeStyles,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import InfiniteScroll from 'react-infinite-scroller';
import _ from 'lodash';
import shortid from 'shortid';
import { fetchItems, cleanBrowse } from '../../../redux/actions/browse';
import { PAGE_SIZE } from '../../../constants/browse';
import ItemCard from './ItemCard';

const useStyles = makeStyles({
  card: {
    minHeight: 500,
    height: '100%',
    maxHeight: 600,
  },
});

const LoadingElement = React.memo(({ numElements }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      {
        _.times(numElements, () => (
          <Grid item xs={12} sm={4} md={3} key={shortid.generate()}>
            <Skeleton variant="rect" className={classes.card} />
          </Grid>
        ))
      }
    </Grid>
  );
});

const Browse = () => {
  const {
    items,
    fetchingItems,
    hasMore,
  } = useSelector((state) => state.browse);
  const dispatch = useDispatch();
  const location = useLocation();

  const numElements = 1
    + (useMediaQuery((theme) => theme.breakpoints.up('sm')) ? 2 : 0)
    + (useMediaQuery((theme) => theme.breakpoints.up('md')) ? 1 : 0);

  React.useEffect(() => () => dispatch(cleanBrowse()), [dispatch]);

  React.useEffect(() => {
    dispatch(fetchItems(0, PAGE_SIZE, location.search));
  }, [location, dispatch]);

  if (fetchingItems) {
    return <LoadingElement numElements={numElements} />;
  }

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={(page) => dispatch(fetchItems(page * PAGE_SIZE, PAGE_SIZE, location.search))}
      hasMore={hasMore}
      initialLoad={false}
      loader={<LoadingElement key={shortid.generate()} numElements={numElements} />}
    >
      <Grid container spacing={3}>
        {
          items.map((item) => <ItemCard item={item} key={item._id} />)
        }
      </Grid>
    </InfiniteScroll>
  );
};

LoadingElement.propTypes = {
  numElements: PropTypes.number.isRequired,
};

export default Browse;
