import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

class Layout extends React.Component {
  static propTypes = {
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
      .isRequired,
  };

  render() {
    const { component, ...props } = this.props;
    return <Route {...props} component={component} />;
  }
}

export { Layout };
