import React from 'react';
import PropTypes from 'prop-types';

import Tag from './Tag';

const propTypes = {
  tag: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p']),
  ]),
  color: PropTypes.string,
};

const defaultProps = {
  tag: 'p',
  color: 'text',
};

const Typography = ({ tag, ...rest }) => {
  return <Tag {...rest} tag={tag} />;
};

Typography.propTypes = propTypes;
Typography.defaultProps = defaultProps;

export { Typography };
