const isNil = value => typeof value === "undefined" || value === null;

const directionsMap = {
  EAST: 0,
  SOUTH: 90,
  WEST: 180,
  NORTH: 270,
  getDirectionFromDegree: function (degree) {
    return Object.keys(this)
      .filter(direction => this[direction] === degree)[0]
  }
};

export const toyRobotModule = (() => {
  let unitX = undefined,
    unitY = undefined,
    directionInDegree = undefined,
    isPlacedOnTable = false;

  const placeRobot = (place = "") => {
    const [xPlace, yPlace, placeDirection] = typeof place === "string" ? place.split(",") : "";
    if (isNil(xPlace) || isNil(yPlace) || isNil(placeDirection) || isNil(directionsMap[placeDirection])) {
      return ["ERROR: Invalid position for PLACE", ""];
    }
    unitX = xPlace;
    unitY = yPlace;
    directionInDegree = directionsMap[placeDirection];
    isPlacedOnTable = true;
    return ["", ""];
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
    if (isPlacedOnTable) {
      return ["", `${unitX},${unitY},${directionsMap.getDirectionFromDegree(directionInDegree)}`];
    }
    return ["ERROR: Toy robot is not placed on table yet", ""];
  };

  /*
    Function getInstructionOutput
    Takes: Input command and arguments
    Returns: [error, output]
   */
  const getInstructionOutput = ({ command, args }) => {
    switch (command) {
      case "PLACE":
        return placeRobot(args._[0]);
      case "REPORT":
        return reportRobotPlace();
      default:
        return ["", ""];
    }
  };

  return {
    getInstructionOutput
  };
})();