const fs = require("fs");
const inquirer = require("inquirer");
const employee = require("./lib/Employee");
const manager = require("./lib/Manager");
const intern = require("./lib/Intern");
const engineer = require("./lib/Engineer");

console.log("Please select the members of your team")

// variable will determine the index of choice (role) selected
let role = "";
let info = "";

function rolePrompt() {
    inquirer.prompt([
        {
            type: "list",
            message: "Select the type of employee:",
            name: "role",
            choices: [
                "Manager",
                "Engineer",
                "Intern",
                "All employees have been selected"
            ]
        }
    ]).then(function (response) {
        if (response.role === "Manager") {
            role = "manager";
            info = "office number";
            promptInfo();
        }
        else if (response.role === "Engineer") {
            role = "engineer";
            info = "Github username";
            promptInfo();
        }
        else if (response.role === "Intern") {
            role = "intern";
            info = "school";
            promptInfo();
        }
        else {
            console.log("generate HTML");
            // generateHTML();
        }

    })
}
rolePrompt();


const choice = {
    manager: {
        extra: "office number"
    },
    engineer: {
        extra: "github username"
    },
    intern: {
        extra: "school"
    }
};

function promptInfo() {
    inquirer.prompt([
        {
            type: "input",
            message: `What is the ${role}'s name?`,
            name: "name"
        },
        {
            type: "input",
            message: `What is the ${role}'s email address?`,
            name: "email"
        },
        {
            type: "input",
            message: `What is the ${role}'s ${choice.role.extra}?`,
            name: "supplementalInfo"
        }
    ]).then(function(response) {
        console.log(response);
    })
}







// // manager
// <i class="fas fa-users"></i>
// // engineer
// <i class="fas fa-user-cog"></i>
// // intern
// <i class="fas fa-user-graduate"></i>



