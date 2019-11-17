const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }
    getRole() {
        return "Manager";
    }
    getOfficeNumber() {
        return this.officeNumber;
    }
}


const managerHTML = (managerArr) => {
    return `<div class="row d-flex justify-content-center pb-4" id="manager">
    <div class="card mx-3" >
        <div class="card-header text-center bg-warning">
            <h4>${managerArr.name}</h4>
            <h5><i class="fas fa-users"></i><span>&nbsp;</span>Manager</h5>
        </div>
        <div class="card-body">
            <div>
                <ul class="list-group list-group-flush border">
                    <li class="list-group-item">ID:<span>&nbsp;</span>${managerArr.id}</li>
                    <li class="list-group-item">Email:<span>&nbsp;</span><a href="mailto:${managerArr.email}" class="card-link">${managerArr.email}</a></li>
                    <li class="list-group-item">Office number:<span>&nbsp;</span>${managerArr.information}</li>
                </ul>
            </div>
        </div>
    </div>
</div>`
}

module.exports = { managerHTML: managerHTML };