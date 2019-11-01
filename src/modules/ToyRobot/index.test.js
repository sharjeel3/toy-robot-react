import { ToyRobot } from "./index";

/**
 * beforeEach & afterEach is used to get a new toy before each test
 */

let toyRobotInstance;

beforeEach(() => {
  toyRobotInstance = new ToyRobot();
});

afterEach(() => {
  toyRobotInstance = null;
});

it("should return default value without any command", () => {
  const props = { command: "", args: { _: [] } };
  const [error, output] = toyRobotInstance.getInstructionOutput(props);
  expect(output).toBe("");
  expect(error).toBe("");
});

it("should return nothing with successful PLACE", () => {
  // place
  const props = { command: "PLACE", args: { _: ["2,1,WEST"] } };
  const [error, output] = toyRobotInstance.getInstructionOutput(props);
  expect(output).toBe("");
  expect(error).toBe("");

  // and report
  const reportProps = { command: "REPORT", args: { _: [] } };
  const [reportError, reportOutput] = toyRobotInstance.getInstructionOutput(reportProps);
  expect(reportOutput).toBe("2,1,WEST");
  expect(reportError).toBe("");
});

it("should return error with failed PLACE command", () => {
  const props = { command: "PLACE", args: { _: ["2,1"] } };
  const [error, output] = toyRobotInstance.getInstructionOutput(props);
  expect(output).toBe("");
  expect(error).not.toBe("");
});

it("should not PLACE at a position outside 5x5 units", () => {
  const props = { command: "PLACE", args: { _: ["7,1,WEST"] } };
  const [error, output] = toyRobotInstance.getInstructionOutput(props);
  expect(output).toBe("");
  expect(error).not.toBe("");
});

it("should not PLACE at a position with invalid direction", () => {
  const props = { command: "PLACE", args: { _: ["4,1,INVALID"] } };
  const [error, output] = toyRobotInstance.getInstructionOutput(props);
  expect(output).toBe("");
  expect(error).not.toBe("");
});

it("should not PLACE at position with incomplete units and direction", () => {
  const props = { command: "PLACE", args: { _: ["4,"] } };
  const [error, output] = toyRobotInstance.getInstructionOutput(props);
  expect(output).toBe("");
  expect(error).not.toBe("");
});

it("should not allow MOVE without PLACE command first", () => {
  const props = { command: "MOVE", args: { _: [] } };
  // const getInstructionOutput = new Object(toyRobotModule.getInstructionOutput);
  const [error, output, stuff] = toyRobotInstance.getInstructionOutput(props);
  expect(output).toBe("");
  expect(error).not.toBe("");
});

it("should not allow LEFT without PLACE command first", () => {
  const props = { command: "LEFT", args: { _: [] } };
  const [error, output] = toyRobotInstance.getInstructionOutput(props);
  expect(output).toBe("");
  expect(error).not.toBe("");
});

it("should not allow RIGHT without PLACE command first", () => {
  const props = { command: "RIGHT", args: { _: [] } };
  const [error, output] = toyRobotInstance.getInstructionOutput(props);
  expect(output).toBe("");
  expect(error).not.toBe("");
});

it("should MOVE after PLACE", () => {
  const placeProps = { command: "PLACE", args: { _: ["2,1,EAST"] } };
  toyRobotInstance.getInstructionOutput(placeProps);

  const props = { command: "MOVE", args: { _: [] } };
  const [error, output] = toyRobotInstance.getInstructionOutput(props);
  expect(output).toBe("");
  expect(error).toBe("");

  const reportProps = { command: "REPORT", args: { _: [] } };
  const [reportError, reportOutput] = toyRobotInstance.getInstructionOutput(reportProps);
  expect(reportOutput).toBe("3,1,EAST");
  expect(reportError).toBe("");
});

it("should have RIGHT turn and not change position", () => {
  const placeProps = { command: "PLACE", args: { _: ["2,1,NORTH"] } };
  toyRobotInstance.getInstructionOutput(placeProps);

  const rightProps = { command: "RIGHT", args: { _: [] } };
  const [rightError, rightOutput] = toyRobotInstance.getInstructionOutput(rightProps);
  expect(rightOutput).toBe("");
  expect(rightError).toBe("");

  const reportProps = { command: "REPORT", args: { _: [] } };
  const [reportError, reportOutput] = toyRobotInstance.getInstructionOutput(reportProps);
  expect(reportOutput).toBe("2,1,EAST");
  expect(reportError).toBe("");

  toyRobotInstance.getInstructionOutput(rightProps);

  const [reportError2, reportOutput2] = toyRobotInstance.getInstructionOutput(reportProps);
  expect(reportOutput2).toBe("2,1,SOUTH");
  expect(reportError2).toBe("");
});

it("should have LEFT turn and not change position", () => {
  const placeProps = { command: "PLACE", args: { _: ["5,3,WEST"] } };
  toyRobotInstance.getInstructionOutput(placeProps);

  const leftProps = { command: "LEFT", args: { _: [] } };
  const [leftError, leftOutput] = toyRobotInstance.getInstructionOutput(leftProps);
  expect(leftOutput).toBe("");
  expect(leftError).toBe("");

  const reportProps = { command: "REPORT", args: { _: [] } };
  const [reportError, reportOutput] = toyRobotInstance.getInstructionOutput(reportProps);
  expect(reportOutput).toBe("5,3,SOUTH");
  expect(reportError).toBe("");

  toyRobotInstance.getInstructionOutput(leftProps);

  const [reportError2, reportOutput2] = toyRobotInstance.getInstructionOutput(reportProps);
  expect(reportOutput2).toBe("5,3,EAST");
  expect(reportError2).toBe("");
});

it("should return to original direction with a LEFT and then RIGHT", () => {
  const placeProps = { command: "PLACE", args: { _: ["4,1,SOUTH"] } };
  const leftProps = { command: "LEFT", args: { _: [] } };
  const rightProps = { command: "RIGHT", args: { _: [] } };
  const reportProps = { command: "REPORT", args: { _: [] } };

  toyRobotInstance.getInstructionOutput(placeProps);
  toyRobotInstance.getInstructionOutput(leftProps);
  toyRobotInstance.getInstructionOutput(rightProps);

  const [reportError, reportOutput] = toyRobotInstance.getInstructionOutput(reportProps);
  expect(reportOutput).toBe("4,1,SOUTH");
  expect(reportError).toBe("");
});

it("should return to original direction with a RIGHT and then LEFT", () => {
  const placeProps = { command: "PLACE", args: { _: ["4,1,EAST"] } };
  const leftProps = { command: "LEFT", args: { _: [] } };
  const rightProps = { command: "RIGHT", args: { _: [] } };
  const reportProps = { command: "REPORT", args: { _: [] } };

  toyRobotInstance.getInstructionOutput(placeProps);
  toyRobotInstance.getInstructionOutput(rightProps);
  toyRobotInstance.getInstructionOutput(leftProps);

  const [reportError, reportOutput] = toyRobotInstance.getInstructionOutput(reportProps);
  expect(reportOutput).toBe("4,1,EAST");
  expect(reportError).toBe("");
});
