import React from 'react';
import { connect } from 'react-redux';

import { SIGN_IN } from 'routes';

const withAuthentication = (login = false) => WrappedComponent => {
  class WithAuthentication extends React.Component {
    componentDidMount() {
      if (!this.props.user) {
        if (!login) {
          this.props.history.push(SIGN_IN);
        }
      } else {
        if (login) {
          this.props.history.push('/');
        }
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return connect(state => ({
    authenticated: state.auth.authenticated,
    user: state.user.user,
  }))(WithAuthentication);
};

export default withAuthentication;
