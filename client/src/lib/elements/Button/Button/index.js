import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { transformTag } from '../../../helpers';
import { Color } from '../../../utilities';

const propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  onClick: PropTypes.func,
  colorType: PropTypes.oneOf(['primary', 'default', 'none']),
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  outline: PropTypes.bool,
  inline: PropTypes.bool,
};

const defaultProps = {
  tag: 'button',
  colorType: 'default',
  outline: false,
  inline: false,
};

const Button = props => <StyledButton {...props} />;
Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export { Button };

const colorType = css`
  ${({ colorType, outline }) => {
    const colorSet = new Color().type(colorType);

    if (outline) {
      return `
        color: ${colorSet.border};
        border-color: ${colorSet.border};
        background-color: transparent;
      `;
    } else {
      return `
        color: ${colorSet.text};
        border-color: ${colorSet.border};
        background-color: ${colorSet.background};
      `;
    }
  }};
`;

const buttonCss = css`
  ${props => props.colorType !== 'none' && colorType};
  ${({ color }) => color && `color: ${new Color(color).get()}`};
  ${({ backgroundColor }) =>
    backgroundColor && `background-color: ${new Color(backgroundColor).get()}`};
  display: ${props => (props.inline ? 'inline-block' : 'block')};

  border-width: 2px;
  border-style: solid;
  cursor: pointer;
  padding: 1rem 2rem;

  &:focus,
  &:active {
    outline: none;
  }
`;

const StyledButton = styled(({ tag, inline, outline, colorType, ...props }) =>
  transformTag({ tag, ...props }),
)`
  ${buttonCss};
`;
