/**
 * @author Kaden Badalian
 *
 * @filename Home.jsx
 * @date 4/7/20
 */

import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';

const Home = () => {
  const authenticated = useSelector((state) => state.global.authenticated);
  const name = useSelector((state) => state.global.user.firstName);

  return (
    <Typography component="h1" variant="h3">
      {
        authenticated ? (
          `Welcome, ${name}!`
        ) : 'Home Page'
      }
    </Typography>
  );
};

export default Home;
