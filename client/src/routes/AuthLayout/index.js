import React from 'react';
import styled from 'styled-components';

import { Layout, Center } from 'lib';

const Page = styled(Center)`
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

const Container = styled.div`
  max-width: 50rem;
  width: 100%;
`;

class AuthLayout extends Layout {
  render() {
    return (
      <Page>
        <Container>{super.render()}</Container>
      </Page>
    );
  }
}

export default AuthLayout;
