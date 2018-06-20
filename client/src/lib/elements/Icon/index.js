import React from 'react';
import PropTypes from 'prop-types';

import { Color } from '../../utilities';

// Icons
import CloseIcon from './CloseIcon';
import ArrowLeftIcon from './ArrowLeftIcon';

class Icon extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    /** px value */
    size: PropTypes.number,
  };

  static defaultProps = {
    color: 'default',
    size: 16,
  };

  render() {
    const { name, color, size, ...props } = this.props;

    switch (name) {
      case 'close':
        return (
          <CloseIcon {...props} color={new Color(color).get()} size={size} />
        );
      case 'arrow-left':
        return (
          <ArrowLeftIcon
            {...props}
            color={new Color(color).get()}
            size={size}
          />
        );
      default:
        console.error(`ERROR: ${name} is not an icon`);
        return <span>Error</span>;
    }
  }
}

export { Icon };
