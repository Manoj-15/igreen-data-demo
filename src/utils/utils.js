const isPositionValid = ({ x, y }) => {
  if (x === '' || y === '') {
    return false;
  }

  x = Number(x);
  y = Number(y);

  if (typeof x !== 'number' || typeof y !== 'number') {
    return false;
  }

  return x >= 0 && x < 5 && y >= 0 && y < 5;
};

const DIRECTION_NAMES = {
  1: 'north',
  2: 'east',
  3: 'south',
  4: 'west',
};

const DIRECTIONS = {
  NORTH: 1,
  EAST: 2,
  SOUTH: 3,
  WEST: 4,
};

const COMMANDS = {
  MOVE: '1',
  LEFT: '2',
  RIGHT: '3',
};

export { isPositionValid, DIRECTIONS, DIRECTION_NAMES, COMMANDS };
