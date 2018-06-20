import React from 'react';

import OpenedSidebar from './OpenedSidebar';
import ClosedSidebar from './ClosedSidebar';

class Sidebar extends React.Component {
  render() {
    const { isOpen } = this.props;
    if (isOpen) {
      return <OpenedSidebar {...this.props} />;
    } else {
      return <ClosedSidebar {...this.props} />;
    }
  }
}

export { Sidebar };
