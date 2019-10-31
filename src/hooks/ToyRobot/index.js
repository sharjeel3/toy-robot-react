import React, { useState } from "react";

export const useToyRobotHook = () => {
  const [ unitX, setUnitX ] = useState(undefined);
  const [ unitY, setUnitY ] = useState(undefined);
  const [ direction, setDirection ] = useState(undefined);

  const placeRobot = () => {
    // more to come
  };

  const moveRobot = () => {
    // more to come
  };

  const turnRobotLeft = () => {
    // more to come
  };

  const turnRobotRight = () => {
    // more to come
  };

  const reportRobotPlace = () => {
    // more to come
  };

  const getInstructionOutput = ({ command, args }) => {
    return [null, undefined];
  };

  return {
    getInstructionOutput
  };
};
