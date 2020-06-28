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
  useLocation,
  useParams,
} from 'react-router-dom';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import AppFrame from './components/AppFrame';
import Home from './components/Content/Home';
import SignIn from './components/Content/SignIn';
import SignUp from './components/Content/SignUp';
import ToDo from './components/Content/ToDo';
import Profile from './components/Content/Profile';
import Browse from './components/Content/Browse';
import Item from './components/Content/Item';

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
        ? <Profile />
        : <Redirect to="/sign_in" />
    )}
  />
);

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: 48,
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const ItemWrapper = () => {
  const { itemId } = useParams();
  return <Item itemInfo={{ _id: itemId }} />;
};

const Routes = () => {
  const authenticated = useSelector((state) => state.global.authenticated);
  const classes = useStyles();

  return (
    <Router>
      <ScrollToTop />
      <AppFrame />
      <Container component="main" className={classes.main}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/browse" component={Browse} />
          <Route exact path="/item/:itemId" component={ItemWrapper} />
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
      </Container>
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
