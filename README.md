Interview Test:

Scope:
# UI Automation
# API Automation

Install(windows):
Do project setup as per the package.json using npm
npm install

verify installation by opening Cypress:
cypress open

Run Test:
    headless mode: cypress run --headless
    via Runner: cypress open -> Tests are available under cypress->e2e->specs

Report:
    Mochawesome report will be generated under CYPRESS_AUTOMATION->mochawesome-report


API Automation:

Task 1:
    pre-requisite:
    "csv-parse" as dependency

    File Name: E:\Cypress_automation\scripts\csvDataFormatting.js

    To run this script, use following scripts:
        npm run format:csv
        
    See result in console

Task 2:
    Spec name: getDogBreedList_test.js

    Added dependency node-fetch
    # Used fetch API calls to get response from API: E:\Cypress_automation\cypress\support\fetchDogBreedList.js
    # From API response created a array of lists and then comparing its size with expected
    # Then Using mocha validated test


UI Automation Task:

    Design Pattern: Page object model
    Spec file accessing respective page files under the Folder via object: cypress->e2e->page

    Spec Name: sweetshop_test.js
    It contains one describe and 4 it blocks
    All repeated steps are provided under beforeEach hooks

    Test data:
        Used Faker Library to create random data at runtime
        Used static testdata file under fixture folder

    Customize commands are added under support-> Command.js
    Dependencies are added under package.json
    Test configuration configured under-> cypress.config.js 
    For assertion used Chai library.