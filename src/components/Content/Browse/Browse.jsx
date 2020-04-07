/**
 * @author Kaden Badalian
 *
 * @filename actionTypes.js
 * @date 4/7/20
 */

import React from 'react';
import {
  Container,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  header: {
    flexGrow: 1,
    backgroundColor: '#a63928',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Browse = () => {
  const classes = useStyles();

  return (
    <Container>
      This is my Browse Page.
    </Container>
  );
};

export default Browse;
