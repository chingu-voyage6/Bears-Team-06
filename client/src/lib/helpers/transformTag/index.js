import React from 'react';

const transformTag = ({ tag, ...props }) => {
  const Tag = tag;
  return React.cloneElement(<Tag {...props} />);
};

export { transformTag };
