import React from "react";
import Terminal from "terminal-in-react";
import "./index.css";
import { useToyRobotHook } from "../../hooks/ToyRobot";

const TerminalView = () => {
  const { getInstructionOutput } = useToyRobotHook();

  const commandFn = command => (args, print) => {
    /* Can do something fancy with error message in future
    Some commands do not return an output for print on screen */
    const [error, output] = getInstructionOutput({ command, args });
    if (error) {
      print(error);
    } else if (output) {
      print(output);
    }
  };

  return (
    <div className="terminal">
      <Terminal
        color="green"
        backgroundColor="black"
        barColor="black"
        startState="maximised"
        style={{ fontWeight: "bold", fontSize: "1em" }}
        commands={{
          PLACE: {
            method: commandFn("PLACE"),
            options: [{
              name: "place",
              defaultValue: undefined
            }]
          }
        }}
        descriptions={{
          show: false,
          PLACE: "PLACE toy robot at a given position(X,Y) and direction(F). Format is PLACE X,Y,F"
        }}
        msg="Welcome REA Team - This is a terminal emulator for Toy Robot simulator demo. Start typing below and press ENTER to run the command."
      />
    </div>
  );
};

export default TerminalView;
