import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavLink, Route } from 'react-router-dom';

import { Color } from '../../utilities/Color';
import { Icon } from '../../elements/Icon';
import { IconButton } from '../../elements/Button';
import { position } from 'config/theme';

const propTypes = {
  open: PropTypes.bool,
  onControlClick: PropTypes.func,
};

const ClosedSidebar = ({
  isOpen,
  toggleOpen,
  opacity,
  transform,
  ...props
}) => (
  <Container style={{ opacity, transform }} {...props}>
    <LogoContainer>
      <div>LOGO</div>
      <SidebarControl name="arrow-left" color="white" onClick={toggleOpen} />
    </LogoContainer>
    <LinkContainer>
      <NavLink to="/home">Hello</NavLink>
      <NavLink to="/facebook">
        <Route path="/facebook">
          {({ match }) => (
            <React.Fragment>
              <Icon name="close" color={match ? 'white' : 'primary'} />
              <Text>Facebook</Text>
            </React.Fragment>
          )}
        </Route>
      </NavLink>
      <NavLink to="/upload">Upload</NavLink>
    </LinkContainer>
  </Container>
);
ClosedSidebar.propTypes = propTypes;

export default ClosedSidebar;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const LogoContainer = styled.div`
  height: 8rem;
  background-color: royalblue;
  position: relative;
  ${position('centerChildren')};
`;

const SidebarControl = styled(IconButton)`
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
`;

const LinkContainer = styled.div`
  a {
    display: flex;
    align-items: center;
    height: 7rem;
    color: ${new Color('primary').get()};
    text-decoration: none;
    padding-left: 3rem;
    position: relative;
    &.active {
      background-color: ${new Color('secondary').get()};
      color: ${new Color('white').get()};
      &::after {
        visibility: visible;
      }
    }
    &::after {
      visibility: hidden;
      content: '';
      ${position('absolute')};
      z-index: -1;
      width: 1rem;
      height: 100%;
      background-color: #cecece;
      transition: width 0.2s ease-in;
    }
    &:hover::after {
      visibility: visible;
      width: 100%;
    }
  }
`;

const Text = styled.span`
  margin-left: 1rem;
`;
