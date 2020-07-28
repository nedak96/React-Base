/**
 * @author Kaden Badalian
 *
 * @filename Home.jsx
 * @date 4/7/20
 */

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Typography } from '@material-ui/core';

const Home = () => {
  const { isAuthenticated, user } = useAuth0();
  return (
    <Typography component="h1" variant="h3">
      {
        isAuthenticated ? (
          `Welcome, ${user.given_name}!`
        ) : 'Home Page'
      }
    </Typography>
  );
};

export default Home;
