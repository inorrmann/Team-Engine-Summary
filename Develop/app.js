const fs = require("fs");
const inquirer = require("inquirer");
const mainHTML = require("./templates/main");
const manager = require("./lib/Manager");

const intern = require("./lib/Intern");
const engineer = require("./lib/Engineer");


// variables store responses from prompts
let role;
let employeeInfo;
let teamName;
let managerArr = [];
let engineerArr = [];
let internArr = [];

// type of information that will be required of each role
let info;

// print to console to begin selection
console.log("Please select the members of your team")


// *** PROMPT VALIDATION FUNCTIONS ***

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

const answerValidation = (input) => {
    if (input === "") {
        return "Please enter a valid answer";
    }
    else {
        return true;
    }
}


// *** PROMPT TO INPUT MANAGER'S INFO***
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
    console.log(managerArr);
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
        if (response.role === "Engineer") {
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
};


// *** PROMPT TO ENTER INFORMATION OF EMPLOYEE ***
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

        // create arrays of types of employees
        if (role === "engineer") {
            engineerArr.push(employeeInfo);
        }
        if (role === "intern") {
            internArr.push(employeeInfo);
        }

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
        generateHTML();
    })
};


// *** APPEND ALL ELEMENTS OF FINAL HTML ***
const generateHTML = () => {
   
        // top of the HTML
        let beginnningOutput = mainHTML.beginningHTML(teamName);
        fs.appendFile(`./output/${teamName}.html`, beginnningOutput, function (err) {
            if (err) throw err;
            console.log("beginningOutput complete");
        });
        
        // manager HTML
        let managerOutput = manager.managerHTML(managerArr);
        fs.appendFile(`./output/${teamName}.html`, managerOutput, function(err) {
            if (err) throw err;
            console.log("managerOutput complete");
        });

        // bottom of the HTML
        let endOutput = mainHTML.endHTML();
        fs.appendFile(`./output/${teamName}.html`, endOutput, function (err) {
            if (err) throw err;
            console.log("endOutput complete");
        });


        
}


// // fs.appendFile for every item in the array (loop/map)




// TO DO:

// in generated HTML:
//      if (internArr[0]) {} use to determine if the row needs to be created and appended,
//     create cards for each position ()
//     mailto: for email addressses
//     Github is connected to the person's page
//     is there a Google search API (for the school link)
// in app.js:
// warning if more than one manager has been selected (allow only one)
