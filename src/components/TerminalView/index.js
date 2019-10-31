import React from "react";
import Terminal from "terminal-in-react";
import "./index.css";
import { toyRobotModule } from "../../modules/ToyRobot";

const TerminalView = () => {
  const { getInstructionOutput } = toyRobotModule;

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

  const commandsList = [
    "PLACE",
    "MOVE",
    "LEFT",
    "RIGHT",
    "REPORT"
  ];

  const terminalCommands = Object.assign({},
    ...commandsList.map(cmd => ({
      [cmd]: {
        method: commandFn(cmd),
          options: [{
          name: cmd.toLowerCase()
        }]
      }
    })));

  return (
    <div className="terminal">
      <Terminal
        color="green"
        backgroundColor="black"
        barColor="black"
        startState="maximised"
        style={{ fontWeight: "bold", fontSize: "1em" }}
        commands={terminalCommands}
        descriptions={{
          show: false,
          PLACE: "Place robot at a given position(X,Y) and direction(F). Format is PLACE X,Y,F",
          MOVE: "Move robot one unit in current direction - if possible",
          LEFT: "Turn robot to left",
          RIGHT: "Turn robot to right",
          REPORT: "Report Robot current position as per PLACE format"
        }}
        msg="Welcome REA Team - This is a terminal emulator for Toy Robot simulator demo. Start typing below and press ENTER to run the command."
      />
    </div>
  );
};

export default TerminalView;
