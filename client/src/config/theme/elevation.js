const ELEVATION_LEVEL = [
  'inset 0 7px 9px -7px rgba(0,0,0,0.7);',
  '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);',
  '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);',
  '0 10px 20px rgba(0,0,0,0.10), 0 6px 6px rgba(0,0,0,0.10);',
  '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);',
  '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);',
];

const elevation = level => {
  const maxLevel = ELEVATION_LEVEL.length;
  if (level < 0 || level > maxLevel) {
    console.error(`ERROR: Elevation level must be between 0 and ${maxLevel}`);
    return ELEVATION_LEVEL[0];
  }

  return ELEVATION_LEVEL[level];
};

export default elevation;
