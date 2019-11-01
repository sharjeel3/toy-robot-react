import {
  LEFT,
  MOVE,
  PLACE,
  REPORT,
  RIGHT,
  MAX_UNIT,
  MIN_UNIT,
  MOVEMENT_MAP,
  DIRECTIONS_MAP
} from "../../constants";

const isNil = value => typeof value === "undefined" || value === null;

const validateUnits = (x, y) => {
  const isValid = value => (value >= MIN_UNIT && value <= MAX_UNIT);
  return (isValid(x) && isValid(y))
};

const getDegrees = (degree, variance) => {
  // avoiding negative degrees and 360deg
  return (360 + degree + variance)%360;
};

export function ToyRobot () {
  let unitX,
    unitY,
    directionInDegree,
    isPlacedOnTable = false;

  const setUnits = (x, y) => {
    unitX = Number(x);
    unitY = Number(y);
  }

  const placeRobot = (place = "") => {
    const [xPlace, yPlace, placeDirection] = typeof place === "string" ? place.split(",") : "";
    if (isNil(xPlace) || isNil(yPlace) || isNil(placeDirection) || isNil(DIRECTIONS_MAP[placeDirection])) {
      return ["ERROR: Invalid position for PLACE", ""];
    }
    setUnits(xPlace, yPlace);
    directionInDegree = DIRECTIONS_MAP[placeDirection];
    isPlacedOnTable = true;
    return ["", ""];
  };

  const moveRobot = () => {
    const variance = MOVEMENT_MAP[directionInDegree];
    const newUnitX = unitX + variance.x;
    const newUnitY = unitY + variance.y;
    if (validateUnits(newUnitX, newUnitY)) {
      setUnits(newUnitX, newUnitY);
      return ["", ""];
    }
    return ["ERROR: MOVE is not allowed in current direction. Try LEFT or RIGHT before MOVE", ""];
  };

  const turnRobotLeft = () => {
    return ["", ""];
  };

  const turnRobotRight = () => {
    directionInDegree = getDegrees(directionInDegree, 90);
    return ["", ""];
  };

  const reportRobotPlace = () => {
    return ["", `${unitX},${unitY},${DIRECTIONS_MAP.getDirectionFromDegree(directionInDegree)}`];
  };

  /*
    Function getInstructionOutput
    Takes: Input command and arguments
    Returns: [error, output]
   */
  const getInstructionOutput = ({ command, args }) => {
    if (!command) {
      return ["", ""];
    }
    if (!isPlacedOnTable && command !== PLACE) {
      return ["ERROR: Toy robot is not placed on table yet", "" ];
    }
    switch (command) {
      case PLACE:
        return placeRobot(args._[0]);
      case REPORT:
        return reportRobotPlace();
      case MOVE:
        return moveRobot();
      case LEFT:
        return turnRobotLeft();
      case RIGHT:
        return turnRobotRight();
      default:
        return ["", ""];
    }
  };

  return {
    getInstructionOutput
  };
}
