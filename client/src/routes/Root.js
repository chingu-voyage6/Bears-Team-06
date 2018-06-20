import 'config/theme';

import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router'; // To use history
import { Route, Switch, Redirect } from 'react-router-dom';

import store from 'modules/store';

// Layouts
import AuthLayout from 'routes/AuthLayout';
import MainLayout from 'routes/MainLayout';

// Pages
import SignInPage from 'pages/auth/SignInPage';
// import SignUpPage from 'pages/auth/SignUpPage';
// import SignOutPage from 'pages/auth/SignOutPage';
import HomePage from 'pages/HomePage';
import NotFoundPage from 'pages/NotFoundPage';

// Misc
import withAuthentication from 'hoc/withAuthentication';
import history from './history';
import * as routes from './';

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            {/* <Route path={routes.SIGN_OUT} component={SignOutPage} /> */}
            <AuthLayout
              path={routes.SIGN_IN}
              component={withAuthentication(true)(SignInPage)}
            />
            {/* <AuthLayout
              path={routes.SIGN_UP}
              component={withAuthentication(true)(SignUpPage)}
            /> */}
            <MainLayout
              path={routes.HOME}
              component={withAuthentication()(HomePage)}
            />
            <Redirect exact from="/" to={routes.HOME} />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default Root;
