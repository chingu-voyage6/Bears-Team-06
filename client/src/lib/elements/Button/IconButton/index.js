import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Button } from '../Button';
import { Icon } from '../../Icon';

const propTypes = {
  name: PropTypes.string.isRequired,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  onClick: PropTypes.func,
  inline: PropTypes.bool,
  /** Icon's prop */
  color: PropTypes.string,
  /** Icon's prop */
  size: PropTypes.number,
};

const defaultProps = {
  inline: true,
  color: 'text',
  tag: 'button',
};

const IconButton = ({ name, color, size, ...props }) => (
  <StyledIconButton {...props} outline>
    <Icon name={name} color={color} size={size} />
  </StyledIconButton>
);

IconButton.propTypes = propTypes;
IconButton.defaultProps = defaultProps;

export { IconButton };

const StyledIconButton = styled(Button)`
  padding: 0.5rem;
  border: none;
`;
