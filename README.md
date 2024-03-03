# Urban Routes App UI Testing

This project involves automated UI testing for the Urban Routes app, a user-friendly application designed to help users navigate city travel options efficiently. Users can explore various travel methods, including walking, driving, and biking, along with estimated costs and durations by specifying starting and ending points. The testing suite focuses on validating the app's functionality to ensure a seamless user experience.

## Setup

Before running the tests, ensure the following prerequisites are met:
- Node.js (LTS version)
- npm (latest version)
- WebdriverIO CLI

### Getting Started

1. Clone the repository to your local machine
2. Navigate to the project directory

### Configuration
To configure the server URL for the project, modify the baseUrl in the wdio.conf.js file according to your testing server.

These tests support running in both headless and non-headless modes with Chrome and Firefox browsers. To change the browser or switch between headless and non-headless modes, update the capabilities section in wdio.conf.js.

### Running the Tests
To execute the tests, run the following command: npm run wdio.

### Test Cases
The test suite includes the following cases with their respective success rates:

1. Setting up addresses
2. Selecting the Supportive plan
3. Filling in the phone number
4. Adding a credit card
5. Writing a message for the driver
6. Ordering a Blanket and handkerchiefs
7. Ordering 2 Ice creams
8. Verifying the car search modal appears
9. Waiting for driver info to appear

These tests are in the createAnOrder.e2e.js file within the test/specs folder.

### Code Style
The project adheres to the following code style conventions:

- ES6 syntax
- Async/Await for handling asynchronous operations
- Descriptive naming conventions for variables and functions
- Consistent indentation (2 spaces)
- Use of single quotes for strings
- Commenting code for clarity where necessary