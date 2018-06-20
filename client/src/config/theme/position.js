const absolute = ({
  position = 'absolute',
  x = 'left',
  y = 'top',
  xValue = '0',
  yValue = '0',
}) => `
  position: ${position};
  ${x}: ${xValue};
  ${y}: ${yValue};
`;

const centerChildren = ({
  display = 'flex',
  justifyContent = 'center',
  alignItems = 'center',
}) => `
  display: ${display};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
`;

const position = (type, options = {}) => {
  switch (type) {
    case 'absolute':
      return absolute(options);
    case 'centerChildren':
      return centerChildren(options);
    default:
      console.error(`ERROR: ${type} is not a position type.`);
      return null;
  }
};

export default position;
