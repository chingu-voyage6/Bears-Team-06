import React from 'react';
import styled from 'styled-components';
import { Transition } from 'react-spring';

import { Layout } from '../Layout';
import { Sidebar } from '../../components/Sidebar';
import { Toggle } from '../../elements/Toggle';

class SidebarLayout extends Layout {
  render() {
    return (
      <Toggle on>
        {({ on, toggle }) => (
          <Transition
            from={{ sidebarWidth: on ? 20 : 8 }}
            enter={{ sidebarWidth: on ? 20 : 8 }}
            leave={{ sidebarWidth: 0 }}
            children={({ sidebarWidth }) => (
              <StyledSidebarLayout sidebarWidth={sidebarWidth}>
                <StyledSidebar isOpen={on} toggleOpen={toggle} />
                <Main>{super.render()}</Main>
              </StyledSidebarLayout>
            )}
          />
        )}
      </Toggle>
    );
  }
}

export { SidebarLayout };

const StyledSidebarLayout = styled.div.attrs({
  style: ({ sidebarWidth }) => ({
    gridTemplateColumns: `${sidebarWidth}rem auto`,
  }),
})`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-areas: 'sidebar main';
`;

const StyledSidebar = styled(Sidebar)`
  grid-area: sidebar;
`;

const Main = styled.div`
  grid-area: main;
  background-color: #cecece;
`;
