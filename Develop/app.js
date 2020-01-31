const fs = require("fs");
const inquirer = require("inquirer");
const mainHTML = require("./templates/main");
const manager = require("./lib/Manager");
const engineer = require("./lib/Engineer");
const intern = require("./lib/Intern");


// variables store responses from prompts
let role;
let employeeInfo;
let teamName;
let managerArr = [];
let engineerArr = [];
let internArr = [];

// type of information that will be required of each role
let info;

// var to concatenate and push the output to generate HTML file
let output = [];


// print to console to begin selection
console.log("Please select the members of your team")


// *** VALIDATION FUNCTIONS FOR PROMPTS ***

const emailValidation = (email) => {
    let emailArr = email.split("");
    const characterAt = (emailArr) => {
        return emailArr === "@";
    };
    const characterDot = (emailArr) => {
        return emailArr === ".";
    };
    // check if there is at least one character in the array that matches
    // the specified characters (i.e., characterAt and characterDot)
    if (emailArr.some(characterAt) && emailArr.some(characterDot)) {
        return true;
    }
    else {
        return "Please enter a valid email address";
    }
};


const answerValidation = (input) => {
    if (input === "") {
        return "Please enter a valid answer";
    }
    else {
        return true;
    }
}


// *** PROMPT TO INPUT MANAGER'S INFO ***
// prompt will print automatically after initial message
inquirer.prompt([
    {
        type: "input",
        message: "What is the manager's name?",
        name: "name",
        validate: answerValidation
    },
    {
        type: "input",
        message: "What is the manager's id?",
        name: "id",
        validate: answerValidation
    },
    {
        type: "input",
        message: "What is the manager's email address?",
        name: "email",
        validate: emailValidation
    },
    {
        type: "input",
        message: "What is the manager's office number?",
        name: "information",
        validate: answerValidation
    }
]).then(function (response) {
    managerArr = response;
    // call prompt to select role of employees
    rolePrompt();
});


// *** PROMPT TO SELECT ROLE OF EMPLOYEE ***
function rolePrompt() {
    inquirer.prompt([
        {
            type: "list",
            message: "Select the role you wish to enter:",
            name: "role",
            choices: [
                "Engineer",
                "Intern",
                "All employees have been selected"
            ],
        }
    ]).then(function (response) {
        // depending on role selected save variables
        // to populate employees' cards
        if (response.role === "Engineer") {
            role = "engineer";
            info = "Github username";
            // call prompt to input employee's info
            infoPrompt();
        }
        else if (response.role === "Intern") {
            role = "intern";
            info = "school";
            infoPrompt();
        }
        // if all employees have been entered, call
        // prompt to input team's name
        else {
            teamPrompt();
        }
    })
};


// *** PROMPT TO INPUT EMPLOYEES' INFO ***
function infoPrompt() {
    inquirer.prompt([
        {
            type: "input",
            message: `What is the ${role}'s name?`,
            name: "name",
            validate: answerValidation
        },
        {
            type: "input",
            message: `What is the ${role}'s id?`,
            name: "id",
            validate: answerValidation
        },
        {
            type: "input",
            message: `What is the ${role}'s email address?`,
            name: "email",
            validate: emailValidation
        },
        {
            type: "input",
            message: `What is the ${role}'s ${info}?`,
            name: "information",
            validate: answerValidation
        }
    ]).then(function (response) {
        employeeInfo = response;

        // create arrays based on employees' roles
        if (role === "engineer") {
            engineerArr.push(employeeInfo);
        }
        if (role === "intern") {
            internArr.push(employeeInfo);
        }
        // call prompt to select role of new employee
        rolePrompt();
    })
}


// *** PROMPT TO ENTER TEAM NAME ***
function teamPrompt() {
    inquirer.prompt([
        {
            type: "input",
            message: "What's the name of the team?",
            name: "team",
            validate: answerValidation
        },
    ]).then(function (response) {
        teamName = response.team;
        // call function to generate HTML will all elements from the prompts
        generateHTML();
    })
};


// *** CREATE FINAL HTML ***
const generateHTML = async () => {

    // top of HTML
    let beginnningOutput = mainHTML.beginningHTML(teamName);
    // manager HTML
    let managerOutput = manager.managerHTML(managerArr);
    let engineerOutput = "";
    let internOutput = "";
    // beginning & end of rows for engineers & interns
    let rowBeginningOutput = mainHTML.rowBeginningHTML();
    let rowEndOutput = mainHTML.rowEndHTML();
    // bottom of HTML
    let endOutput = mainHTML.endHTML();

    // engineer HTML, create output if array has at least one element
    if (engineerArr[0]) {
        let engineerStr = "";
        for (i = 0; i < engineerArr.length; i++) {
            let engineersHTML = engineer.engineerHTML(engineerArr, i);
            engineerStr += engineersHTML;
        }
        // concatenate the entire row of engineers
        engineerOutput = rowBeginningOutput.concat(engineerStr + rowEndOutput);
    }

    // intren HTML, create output if array has at least one element
    if (internArr[0]) {
        let internStr = "";
        for (j = 0; j < internArr.length; j++) {
            let internsHTML = intern.internHTML(internArr, j);
            internStr += internsHTML;
        }
        // concatenate the entire row of interns
        internOutput = rowBeginningOutput.concat(internStr + rowEndOutput);
    }

    // concatenate all parts of the final HTML and push to output var
    await output.push(beginnningOutput + managerOutput + engineerOutput + internOutput + endOutput);

    // write in an HTML file with team's name
    await fs.writeFile(`./output/${teamName}.html`, output, function (err) {
        if (err) throw err;
        console.log("HTML complete");
    })
}
