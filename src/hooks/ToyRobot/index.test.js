import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { ToyRobotHookContainer } from "./index";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it("should return default value without any command", () => {
  act(() => {
    ReactDOM.render(<ToyRobotHookContainer />, container);
  });
  const div = container.querySelector("div");
  const { output } = div.dataset;
  expect(output).toBe("");
});
