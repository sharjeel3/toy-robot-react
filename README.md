# Toy Robot Simulator
This simulator is built with JavaScript and a terminal emulator using React. Ideally it would have been more suitable to choose a backend focused solution with a real terminal. However I went with the stack matching my strengths.

## Show me the simulator
The solution is deployed in Netlify cloud for you to view it in action. Visit this URL https://toy-robot-react.netlify.com/. <br />
If you would like to run it locally, follow these instructions:
1. Open a terminal and switch to project directory
2. Install dependencies using `npm install`
3. Run `npm start` and go to http://localhost:3000 in browser

Further details about available scripts and tests are mentioned below.

## Available Scripts

Since the terminal is using a React package, you can see the solution in your browser to play around and run commands for toy robot.<br /> 
In the project directory, you can run:

### `npm install`

You should run this first to install project dependencies using npm.

### `npm start`

Runs the app in the development mode.<br />
Your browser should start automatically by default. If it doesn't, open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
Press `a` to run all tests. You should see the output of the tests from there.<br />
At the bottom, you should see three advance tests with the details of input and output in test description.

### `npm run build`

Builds the app for production to the `build` folder.<br />
Polyfills for IE11 are not currently included. Please use latest version of Google Chrome, Mozilla Firefox or Microsoft Edge browsers.

## What has been done

* The complete solution is implemented for the Toy Robot simulator. Following commands are supported as per the instructions
   
    * PLACE X,Y,F
    * MOVE
    * LEFT
    * RIGHT
    * REPORT

* Tests have been added for testing the functionality of simulator and correct outputs
* Solution uses very simple css. There wasn't any need to plug SCSS or CSS in JS for this exercise
* There are three test data examples in the instructions. To find more test data, please see modules/ToyRobot/index.test.js 

## Solution approach

* I have built Toy Robot with a simple ES6 module. This module can remember 
the private data such as position and returns the output once we enter a command
* To make unit tests work well independently, I am creating a new instance of ToyRobot module for each test
* For React terminal, we just use one ToyRobot
* Solution uses constant data defined in `constants.js` 
* The direction for robot is stored as degrees defined in clockwise manner. This is done to keep LEFT, RIGHT movements simple to implement. In the end, it is a matter of adding or subtracting 90deg for RIGHT or LEFT 
* Separate variables hold the x and y units of robot. I am validating the units before setting the values to satisfy the business rules
* Different commands are mapped to handler functions using switch statement. We can discuss if there are better design patterns like Command or Strategy


## Considerations for the future

* Consider styling for error messages
* Consider implementation with a real terminal
