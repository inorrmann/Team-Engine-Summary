const Employee = require("./Employee");

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
    }
    getRole() {
        return "Intern";
    }
    getSchool() {
        return this.school;
    }
}

const internHTML = (internArr, j) => {
    return `<div class="card mx-3">
    <div class="card-header text-center bg-warning">
        <h4>${internArr[j].name}</h4>
        <h5><i class="fas fa-user-graduate"></i><span>&nbsp;</span>Intern</h5>
    </div>
    <div class="card-body">
        <div>
            <ul class="list-group list-group-flush border">
                <li class="list-group-item">ID:<span>&nbsp;</span>${internArr[j].id}</li>
                <li class="list-group-item">Email:<span>&nbsp;</span><a href="mailto:${internArr[j].email}" class="card-link">${internArr[j].email}</a></li>
                <li class="list-group-item">School:<span>&nbsp;</span>${internArr[j].information}</li>
            </ul>
        </div>
    </div>
</div>`
}

module.exports = { internHTML: internHTML }

