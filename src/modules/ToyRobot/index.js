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

const isNotNumber = value => isNil(value) || isNaN(value) || `${value}`.trim() === "";

const isValidUnit = value => (value >= MIN_UNIT && value <= MAX_UNIT);

const validateUnits = (x, y) => {
  if (isNotNumber(x) || isNotNumber(y)) {
    return false;
  }
  return (isValidUnit(Number(x)) && isValidUnit(Number(y)))
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
    if (!validateUnits(xPlace, yPlace)) {
      return ["ERROR: Invalid position for PLACE. Try units within 0 to 5 range", ""];
    }
    if (isNil(placeDirection) || isNil(DIRECTIONS_MAP[placeDirection])) {
      return ["ERROR: Invalid direction for PLACE. Try one of EAST, WEST, NORTH or SOUTH", ""];
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
    directionInDegree = getDegrees(directionInDegree, -90);
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
