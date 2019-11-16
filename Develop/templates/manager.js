// <!-- manager row -->
function managers(manager) {
    return `<div class="row d-flex justify-content-center py-4" id="manager">
    
    <div class="card mx-3" style="width: 18rem;">
    <div class="card-header text-center bg-warning">
    <h4>${manager.name}</h4>
    <h5><i class="fas fa-users"></i><span>&nbsp;</span>Manager</h5>
    </div>
    <div class="card-body">
    <div>
    <ul class="list-group list-group-flush border">
    <li class="list-group-item">ID:<span>&nbsp;</span>${manager.id}</li>
    <li class="list-group-item">Email:<span>&nbsp;</span><a href="#" class="card-link">${manager.email}</a>
    </li>
    <li class="list-group-item">Office number:<span>&nbsp;</span>${manager.information}</li>
    </ul>
    </div>
    </div>
    </div>
    
    </div>`
}

module.exports = managers;