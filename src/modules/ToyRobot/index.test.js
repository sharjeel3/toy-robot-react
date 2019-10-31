import { toyRobotModule } from "./index";

it("should return default value without any command", () => {
  const [error, output] = toyRobotModule.getInstructionOutput({ command: "", args: { _: [] } });
  expect(output).toBe("");
  expect(error).toBe("");
});

it("should return nothing with successful placement", () => {
  // place
  const props = { command: "PLACE", args: { _: ["2,1,WEST"] } };
  const [error, output] = toyRobotModule.getInstructionOutput(props);
  expect(output).toBe("");
  expect(error).toBe("");

  // and report
  const props1 = { command: "REPORT", args: { _: [] } };
  const [error1, output1] = toyRobotModule.getInstructionOutput(props1);
  expect(output1).toBe("2,1,WEST");
  expect(error1).toBe("");
});

it("should return error with failed placement command", () => {
  const props = { command: "PLACE", args: { _: ["2,1"] } };
  const [error, output] = toyRobotModule.getInstructionOutput(props);
  expect(output).toBe("");
  expect(error).not.toBe("");
});
