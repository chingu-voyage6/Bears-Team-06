import React from 'react';
import styled from 'styled-components';

const AuthLayout = ({ children }) => (
  <Page>
    <Container>{children}</Container>
  </Page>
);
export default AuthLayout;

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 400px;
  height: 400px;
  border: 1px solid darkred;
`;
