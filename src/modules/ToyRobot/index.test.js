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

it("should not allow MOVE without PLACE command first", () => {
  const props = { command: "MOVE", args: { _: [] } };
  // const getInstructionOutput = new Object(toyRobotModule.getInstructionOutput);
  const [error, output, stuff] = toyRobotInstance.getInstructionOutput(props);
  console.log("stuff is ", stuff)
  expect(output).toBe("");
  expect(error).not.toBe("");
});

it("should return error with failed PLACE command", () => {
  const props = { command: "PLACE", args: { _: ["2,1"] } };
  const [error, output] = toyRobotInstance.getInstructionOutput(props);
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
