/**
 * @author Kaden Badalian
 *
 * @filename Routes.jsx
 * @date 4/7/20
 */

import React from 'react';
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';
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
import AppFrame from './components/AppFrame';
import Home from './components/Content/Home';
import Profile from './components/Content/Profile';
import Browse from './components/Content/Browse';
import Item from './components/Content/Item';

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
  const { loginWithRedirect } = useAuth0();
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
          <Route exact path="/user" component={withAuthenticationRequired(Profile)} />
          <Route exact path="/sign_in" render={loginWithRedirect} />
          <Route exact path="/sign_up" render={() => loginWithRedirect({ screen_hint: 'signup' })} />
          <Redirect to="/" />
        </Switch>
      </Container>
    </Router>
  );
};

export default Routes;
