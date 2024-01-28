import React, { useState } from 'react';
import classes from './Robot.module.css';
import Form from './Form';
import {
  COMMANDS,
  DIRECTIONS,
  DIRECTION_NAMES,
  isPositionValid,
} from './utils';
import arrow from './arrow.png';

const initialMatrix = Array.from({ length: 6 }).map((_, i) =>
  Array.from({ length: 6 }).fill(false)
);

const Robot = () => {
  const [currentPosition, setCurrentPosition] = useState({
    x: -1,
    y: -1,
  });
  const [currentDirection, setCurrentDirection] = useState(DIRECTIONS.NORTH);

  const [matrix, setMatrix] = useState(structuredClone(initialMatrix));

  const setInitialPosition = (data) => {
    const { position, direction } = data;

    setCurrentPosition(position);
    setCurrentDirection(direction);

    const updatedMatrix = structuredClone(initialMatrix);

    if (position.x !== 0 || position.y !== 0) {
      updatedMatrix[0][0] = false;
      updatedMatrix[position.x][position.y] = true;
    }

    setMatrix(updatedMatrix);
  };

  const renderGridItems = () => {
    let angle = 0;

    if (currentDirection === DIRECTIONS.NORTH) {
      angle = '-90deg';
    } else if (currentDirection === DIRECTIONS.EAST) {
      angle = '0deg';
    } else if (currentDirection === DIRECTIONS.SOUTH) {
      angle = '90deg';
    } else {
      angle = '180deg';
    }

    return matrix.map((row, i) => {
      return row.map((val, j) => {
        return (
          <div key={`${i}-${j}`} className={classes.box}>
            <span className={classes.vertical}>{i === 0 ? j : ''}</span>
            <span className={classes.horizontal}>{j === 0 ? i : ''}</span>

            {val ? (
              <div className={classes.robot}>
                <img
                  src={arrow}
                  alt="Robot"
                  style={{
                    transform: `rotate(${angle})`,
                  }}
                />
              </div>
            ) : (
              ''
            )}
          </div>
        );
      });
    });
  };

  const handleMove = () => {
    let { x, y } = currentPosition;

    switch (currentDirection) {
      case DIRECTIONS.NORTH:
        y++;
        break;
      case DIRECTIONS.EAST:
        x++;
        break;
      case DIRECTIONS.SOUTH:
        y--;
        break;
      case DIRECTIONS.WEST:
        x--;
        break;

      default:
        break;
    }

    if (isPositionValid({ x, y })) {
      setInitialPosition({ position: { x, y }, direction: currentDirection });
    }
  };

  const handleDirectionChange = (command) => {
    if (command === COMMANDS.LEFT) {
      setCurrentDirection((prev) => {
        let newState = prev - 1;

        if (newState === 0) {
          newState = 4;
        }

        return newState;
      });
    } else {
      setCurrentDirection((prev) => {
        let newState = prev + 1;

        if (newState === 5) {
          newState = 1;
        }

        return newState;
      });
    }
  };

  const report = (command) => {
    switch (command) {
      case COMMANDS.MOVE:
        handleMove();
        break;
      case COMMANDS.LEFT:
        handleDirectionChange(COMMANDS.LEFT);
        break;
      case COMMANDS.RIGHT:
        handleDirectionChange(COMMANDS.RIGHT);
        break;

      default:
        break;
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.grid}>{renderGridItems()}</div>

      <div>
        <Form setInitialPosition={setInitialPosition} report={report} />
        <h3>Output</h3>
        {currentPosition.x},{currentPosition.y},
        {DIRECTION_NAMES[currentDirection].toUpperCase()}
      </div>
    </div>
  );
};

export default Robot;
