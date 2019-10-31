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

  /*
    Function getInstructionOutput
    Takes: Input command and arguments
    Returns: [error, output]
   */
  const getInstructionOutput = ({ command, args }) => {
    return ["", ""];
  };

  return {
    getInstructionOutput
  };
};

export const ToyRobotHookContainer = () => {
  const { getInstructionOutput } = useToyRobotHook();
  const [error, output] = getInstructionOutput({ command: "", args: { _: [] } });
  return <div data-output={output} data-error={error} />;
};
