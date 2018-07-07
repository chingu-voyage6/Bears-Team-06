const generateTypes = constants => {
  if (!typeOf(constants) === 'array') {
    console.error(`ERROR: "${constants}" is not an array.`);
  }

  return constants.reduce((acc, cur) => {
    acc[cur] = cur;
    return acc;
  }, {});
};

const typeOf = value => {
  let type = typeof value;
  if (type === 'object') {
    if (!value) {
      type = 'null';
    } else if (value instanceof Array) {
      type = 'array';
    }
  }
  return type;
};

export default generateTypes;
