import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const propTypes = {
  size: PropTypes.oneOf(['s', 'm', 'l']),
  color: PropTypes.string,
};
const defaultProps = {
  size: 'm',
  color: 'mediumseagreen',
};

const Spinner = ({ size, ...props }) => {
  const pxSize = getSize(size);
  return <StyledSpinner size={pxSize} {...props} />;
};
Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;

export default Spinner;

const getSize = size => {
  switch (size) {
    case 's':
      return 30;
    case 'm':
      return 60;
    case 'l':
      return 120;
    default:
      console.error(`ERROR: ${size} is not a spinner size.`);
      return 60;
  }
};

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled.div`
  border: ${props => 0.13 * props.size}px solid #f3f3f3;
  border-top-color: ${props => props.color};
  border-radius: 50%;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  animation: ${spin} 2s linear infinite;
`;
