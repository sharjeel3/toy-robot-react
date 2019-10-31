import React from "react";
import Terminal from "terminal-in-react";
import "./index.css";

const TerminalView = () => {
  return (
    <div className="terminal">
      <Terminal
        color="green"
        backgroundColor="black"
        barColor="black"
        startState="maximised"
        style={{ fontWeight: "bold", fontSize: "1em" }}
        commands={{}}
        descriptions={{
          show: false
        }}
        msg="Welcome REA Team - This is a terminal emulator for Toy Robot simulator demo. Start typing below and press ENTER to run the command."
      />
    </div>
  );
};

export default TerminalView;
