/**
 * @author Kaden Badalian
 *
 * @filename Routes.jsx
 * @date 4/7/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppFrame from './components/AppFrame';
import Home from './components/Content/Home';
import SignIn from './components/Content/SignIn';
import SignUp from './components/Content/SignUp';
import ToDo from './components/Content/ToDo';

const AuthenticateRoute = ({ authenticated, path, Component }) => (
  <Route
    exact
    path={path}
    render={() => (
      !authenticated
        ? <Component />
        : <Redirect to="/" />
    )}
  />
);

const UserRoute = ({ authenticated }) => (
  <Route
    exact
    path="/user"
    render={() => (
      authenticated
        ? <ToDo />
        : <Redirect to="/sign_in" />
    )}
  />
);

const Routes = () => {
  const authenticated = useSelector((state) => state.global.authenticated);
  return (
    <Router>
      <AppFrame />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/browse" component={ToDo} />
        <AuthenticateRoute
          authenticated={authenticated}
          path="/sign_in"
          Component={SignIn}
        />
        <AuthenticateRoute
          authenticated={authenticated}
          path="/sign_up"
          Component={SignUp}
        />
        <AuthenticateRoute
          authenticated={authenticated}
          path="/forgot_password"
          Component={ToDo}
        />
        <UserRoute authenticated={authenticated} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

UserRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

AuthenticateRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  Component: PropTypes.func.isRequired,
};

export default Routes;
