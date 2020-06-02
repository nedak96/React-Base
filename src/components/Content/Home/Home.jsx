/**
 * @author Kaden Badalian
 *
 * @filename Home.jsx
 * @date 4/7/20
 */

import React from 'react';
import { useSelector } from 'react-redux';
import {
  Container, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  mainContainer: {
    margin: 15,
  },
}));

const Home = () => {
  const authenticated = useSelector((state) => state.global.authenticated);
  const name = useSelector((state) => state.global.user.firstName);
  const classes = useStyles();

  return (
    <Container className={classes.mainContainer}>
      <Typography component="h1" variant="h3">
        {
          authenticated ? (
            `Welcome, ${name}!`
          ) : 'Home Page'
        }
      </Typography>
    </Container>
  );
};

export default Home;
