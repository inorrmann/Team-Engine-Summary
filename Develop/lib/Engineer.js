const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }
    getRole() {
        return "Engineer";
    }
    getGithub() {
        return this.github;
    }
}

const engineerHTML = (engineerArr, i) => {
return `<div class="card mx-3">
        <div class="card-header text-center bg-warning">
            <h4>${engineerArr[i].name}</h4>
            <h5><i class="fas fa-user-cog"></i><span>&nbsp;</span>Engineer</h5>
        </div>
        <div class="card-body">
            <div>
                <ul class="list-group list-group-flush border">
                    <li class="list-group-item">ID:<span>&nbsp;</span>${engineerArr[i].id}</li>
                    <li class="list-group-item">Email:<span>&nbsp;</span><a href="mailto:${engineerArr[i].email}" class="card-link">${engineerArr[i].email}</a>
                    </li>
                    <li class="list-group-item">Github:<span>&nbsp;</span><a href="https://github.com/${engineerArr[i].information}/" class="card-link">${engineerArr[i].information}</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>`
}

module.exports = {engineerHTML: engineerHTML};