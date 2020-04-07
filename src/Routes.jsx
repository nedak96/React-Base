/**
 * @author Kaden Badalian
 *
 * @filename actionTypes.js
 * @date 4/7/20
 */

import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import AppFrame from './components/AppFrame';
import Browse from './components/Content/Browse';
import Home from './components/Content/Home';

const Routes = () => (
  <Router>
    <AppFrame />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/browse" component={Browse} />
      <Redirect to="/" />
    </Switch>
  </Router>
);

export default Routes;
