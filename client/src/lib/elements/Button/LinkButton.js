import React from 'react';
import styled from 'styled-components';

import { Button } from './Button';

const defaultProps = {
  tag: 'a',
  outline: true,
};

const LinkButton = props => <StyledLinkButton {...props} />;
LinkButton.defaultProps = defaultProps;

export { LinkButton };

const StyledLinkButton = styled(Button)`
  padding: 0;
  border: none;
`;
