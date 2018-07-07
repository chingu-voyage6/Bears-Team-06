import React from 'react';
import { connect } from 'react-redux';
import history from '../history';
import Spinner from 'elements/Spinner';

const withAuthorization = (allowedRoles, redirect) => Component => {
  if (!allowedRoles) allowedRoles = '[user]';
  if (!redirect) redirect = '/';

  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.checkAuthorization();
    }

    componentDidUpdate() {
      this.checkAuthorization();
    }

    checkAuthorization() {
      if (!allowedRoles.includes(this.props.role)) {
        history.push(redirect);
      }
    }

    render() {
      const { role, ...props } = this.props;
      if (allowedRoles.includes(role)) {
        return <Component {...props} />;
      } else {
        return <Spinner />;
      }
    }
  }

  return connect(state => ({
    role: state.user.role,
  }))(WithAuthorization);
};

export default withAuthorization;
