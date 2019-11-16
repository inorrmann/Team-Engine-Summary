const fs = require("fs");
const inquirer = require("inquirer");
const beginningHTML = require("./templates/beginning");
const endHTML = require("./templates/end");


const employee = require("./lib/Employee");
const manager = require("./lib/Manager");
const intern = require("./lib/Intern");
const engineer = require("./lib/Engineer");
const managers = require("./templates/manager");

console.log("Please select the members of your team")

// variables store responses from prompt
let role;
let employeeInfo;
let teamName;
// type of information that will be required of each role
let info;


// *** PROMPT TO SELECT ROLE OF EMPLOYEE ***
function rolePrompt() {
    inquirer.prompt([
        {
            type: "list",
            message: "Select the role you wish to enter:",
            name: "role",
            choices: [
                "Manager",
                "Engineer",
                "Intern",
                "All employees have been selected"
            ]
        }
    ]).then(function (response) {
        role = response.role;
        if (response.role === "Manager") {
            role = "manager";
            info = "office number";
            infoPrompt();
        }
        else if (response.role === "Engineer") {
            role = "engineer";
            info = "Github username";
            infoPrompt();
        }
        else if (response.role === "Intern") {
            role = "intern";
            info = "school";
            infoPrompt();
        }
        else {
            teamPrompt();
        }
    })
}
rolePrompt();


// *** PROMPT TO ENTER INFORMATION OF EMPLOYEE ***
function infoPrompt() {
    // email validation function
    const emailValidation = (email) => {
        let emailArr = email.split("");
        const characterAt = (emailArr) => {
            return emailArr === "@";
        };
        const characterDot = (emailArr) => {
            return emailArr === ".";
        };
        if (emailArr.some(characterAt) && emailArr.some(characterDot)) {
            return true;
        }
        else {
            return "Please enter a valid email address";
        }
    };

    inquirer.prompt([
        {
            type: "input",
            message: `What is the ${role}'s name?`,
            name: "name"
        },
        {
            type: "input",
            message: `What is the ${role}'s id?`,
            name: "id"
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
            name: "information"
        }
    ]).then(function (response) {
        employeeInfo = response;
        employeeInfo.role = role;
        rolePrompt();
    })
}


// *** PROMPT TO ENTER TEAM NAME ***
function teamPrompt() {
    inquirer.prompt([
        {
            type: "input",
            message: "What's the name of the team?",
            name: "team"
        },
    ]).then(function (response) {
        teamName = response.team;
        generateHTML();
    })
};


// *** APPEND ALL ELEMENTS OF FINAL HTML ***
const generateHTML = () => {
    let beginnningOutput = beginningHTML(teamName);
    fs.appendFile(`./output/${teamName}.html`, beginnningOutput, function (err) {
        if (err) throw err;
        console.log("beginningOutput complete");
    });
    let endOutput = endHTML();
    fs.appendFile(`./output/${teamName}.html`, endOutput, function(err) {
        if (err) throw err;
        console.log("endOutput complete");
    })
}

// // array to create all the employers of one role
// let managersArray = {
//     name: 'ddd',
//     id: 'ddddd',
//     email: 'ddddddd',
//     information: 'fffff',
//     role: 'engineer'
// };
// let managerTemplate = managers(managersArray);
// fs.appendFile("output.html", managerTemplate, function (err) {
//     if (err) throw err;
//     console.log("complete")
// })

// // fs.appendFile for every item in the array (loop/map)




// TO DO:
// in generated HTML:
//     create cards for each position ()
//     mailto: for email addressses
//     Github is connected to the person's page
//     is there a Google search API (for the school link)
// in app.js:
// warning if more than one manager has been selected (allow only one)
