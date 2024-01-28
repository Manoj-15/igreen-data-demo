import React, { useState } from 'react';
import classes from './Form.module.css';
import { COMMANDS, DIRECTIONS, isPositionValid } from './utils';

const Form = ({ setInitialPosition, report }) => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });
  const [direction, setDirection] = useState(DIRECTIONS.NORTH);
  const [command, setCommand] = useState(COMMANDS.MOVE);

  const onPositionChange = (e, axis) => {
    setPosition({
      ...position,
      [axis]: e.target.value,
    });
  };

  const onDirectionChange = (e) => {
    setDirection(e.target.value);
  };

  const onSetPositionClick = () => {
    if (isPositionValid(position)) {
      setInitialPosition({ position, direction });
    }
  };

  const onCommandChange = (e) => {
    setCommand(e.target.value);
  };

  const onReport = (e) => {
    report(command);
  };

  return (
    <div className={classes.form}>
      <h4>Set initial position</h4>
      <div className={classes.wrapper}>
        <div className={classes.initialPosition}>
          <div>
            <label htmlFor="xPosition">X</label>
            <input
              type="text"
              onChange={(e) => onPositionChange(e, 'x')}
              id="xPosition"
              value={position.x}
            />
          </div>

          <div>
            <label htmlFor="yPosition">Y</label>
            <input
              type="text"
              onChange={(e) => onPositionChange(e, 'y')}
              id="yPosition"
              value={position.y}
            />
          </div>

          <select
            value={direction}
            onChange={onDirectionChange}
            name="selectDirection"
          >
            <option value={1}>North</option>
            <option value={3}>South</option>
            <option value={2}> East</option>
            <option value={4}>West</option>
          </select>

          <button type="button" onClick={onSetPositionClick}>
            Set initial Position
          </button>
        </div>

        <div className={classes.command}>
          <h4>Command</h4>
          <select
            value={command}
            onChange={onCommandChange}
            name="selectCommand"
          >
            <option value={1}>Move</option>
            <option value={2}>Left</option>
            <option value={3}> Right</option>
          </select>

          <button type="button" onClick={onReport}>
            Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
