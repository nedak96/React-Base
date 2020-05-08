/**
 * @author Kaden Badalian
 *
 * @filename ToDo.js
 * @date 4/20/20
 */

import React from 'react';
import {
  Container, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  mainContainer: {
    margin: 15,
  },
}));

const ToDo = () => {
  const classes = useStyles();

  return (
    <Container className={classes.mainContainer}>
      <Typography component="h1" variant="h3">
        ToDo
      </Typography>
    </Container>
  );
};

export default ToDo;
