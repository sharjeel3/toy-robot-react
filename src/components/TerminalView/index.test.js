import React from "react";
import renderer from "react-test-renderer";
import TerminalView from "./index";

it("should render terminal without crashing", () => {
  const tree = renderer.create(<TerminalView />).toJSON();
  expect(tree).toMatchSnapshot();
});
