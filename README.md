# Rest API testing using Cypress + cucumber + cloud dashboard framework

# Prerequisites

The first thing we need to do is to setup our environment. So here are some things that you should have to start this project:

VSCode: https://code.visualstudio.com/download </br>
NPM: https://www.npmjs.com/get-npm </br>
NodeJS: https://nodejs.org/en/download

# Special plugin to get api debugs
Install cypress-plugin-api plugin to get debug logs of apis (header, test data, response body, etc)

# Screenshots
![cypress-cucumberr-report](https://github.com/alagamai/cypress-api-cucumber-framework/blob/main/cypress/images/cucumber-report.png "cucumber-report")
![cypress-cloud-runner-report1](https://github.com/alagamai/cypress-api-cucumber-framework/blob/main/cypress/images/cypress-test-runner-gui1.png "cypress-cloud-runner-report1")
![cypress-cloud-runner-report](https://github.com/alagamai/cypress-api-cucumber-framework/blob/main/cypress/images/cypress-cloud-runner-report.png "cypress-cloud-runner-report")
![cypress-cloud-runner-view-report](https://github.com/alagamai/cypress-api-cucumber-framework/blob/main/cypress/images/cloud-runner-view-output.png "cypress-cloud-runner-view-report")

## Use

1. Checkout the project from git - git clone https://github.com/alagamai/cypress-api-cucumber-framework.git 
2. Navigate to the project root directory -cypress-api-cucumber-framework
3. Install dependencies with `npm install` 
4. See scripts in `package.json` and run the tests. The main ones are
* `npm run cy:open` - runs Cypress in GUI mode
* `npm run cy:test` - runs cypress test in headless mode
    
# Application under test

https://api.zippopotam.us
