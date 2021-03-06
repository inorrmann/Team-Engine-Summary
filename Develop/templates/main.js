const beginningHTML = (teamName) => {
    return `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Organization Chart</title>
        <!-- Bootstrap CDN -->
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js" integrity="sha384-xrRywqdh3PHs8keKZN+8zzc5TX0GRTLCcmivcbNJWm2rs5C8PRhcEn3czEjhAO9o" crossorigin="anonymous"></script>
        <!-- Font Awesome -->
        <script src="https://kit.fontawesome.com/55233fae23.js" crossorigin="anonymous"></script>

        <style>
        .jumbotron {
            background-image: url("../templates/code-background.jpg");
            background-size: cover;
            color: lightgrey;
            border-radius: 0;
        }
        </style>
    </head>

    <body>
        <div class="jumbotron sticky-top text-center">
            <h1 class="display-3 font-weight-bold" id="main-title">${teamName}</h1>
        </div>
        <div class="container">`
}


const endHTML = () => {
    return `</div>
    </body>
    </html>`
}

const rowBeginningHTML = () => {
    return `<div class="row d-flex justify-content-center py-4 border-top">`
}

const rowEndHTML = () => {
    return `</div>`
}

module.exports = {
    beginningHTML: beginningHTML,
    endHTML: endHTML,
    rowBeginningHTML: rowBeginningHTML,
    rowEndHTML: rowEndHTML
}


