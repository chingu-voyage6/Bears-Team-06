import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Spinner from 'elements/Spinner';

class SplashPage extends React.Component {
  componentDidMount() {
    const { authenticated, history } = this.props;
    if (authenticated) {
      history.push('/home');
    } else {
      history.push('/sign-in');
    }
  }

  render() {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }
}

export default connect(state => ({ authenticated: state.auth.authenticated }))(
  SplashPage,
);

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
