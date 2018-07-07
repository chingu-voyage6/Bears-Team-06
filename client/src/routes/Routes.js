import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

// Pages
import SignInPage from 'pages/auth/SignInPage';
import HomePage from 'pages/HomePage';
import NotFoundPage from 'pages/NotFoundPage';

// Misc
import history from './history';
import withAuthorization from './hoc/withAuthorization';

const Guest = withAuthorization(['guest'], '/home');
const User = withAuthorization(['user'], '/sign-in');

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route path="/sign-in" component={Guest(SignInPage)} />
      <Route path="/home" component={User(HomePage)} />
      <Redirect exact from="/" to="/home" />
      <Route component={NotFoundPage} />
    </Switch>
  </Router>
);

export default Routes;