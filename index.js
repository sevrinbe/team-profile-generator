const inquirer = require("inquirer");
const fs = require('fs');
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
let runAgain = true; 

const goAgain = {
    type: "confirm",
    message: "Do you need to add another employee?",
    name: "booleanAnswer"
};

function runInquirer() {
    const promptArray = [{
        type: "input",
        message: "What is your name?",
        name: "name"
    }, 
    {
        type: "input",
        message: "What is your ID?",
        name: "id"
    }, 
    {
        type: "input",
        message: "What is your email?",
        name: "email"
    }, 
    {
        type: "list",
        message: "What is your title",
        choices: ["Manager", "Engineer", "Intern"],
        name: "position"
    }];
    return inquirer
    .prompt(promptArray);
}

function runInquirerManager() {
    const promptArray = [{
        type: "input",
        message: "What is your office number?",
        name: "officeNumber"
    }];
    return inquirer
    .prompt(promptArray);
}

function runInquirerEngineer() {
    const promptArray = [{
        type: "input",
        message: "What is your github?",
        name: "github"
    }];
    return inquirer
    .prompt(promptArray);
}

function runInquirerIntern() {
    const promptArray = [{
        type: "input",
        message: "What school do you attend?",
        name: "school"
    }];
    return inquirer
    .prompt(promptArray);
}

async function runProgram() {
    let employeeArray = [];
    while(runAgain) {
        const promise = new Promise((resolve, reject) => {
            runInquirer()
            .then(function ({ name, id, email, position }) {
                if (position === "Manager") {
                    runInquirerManager().then(function ({ officeNumber }) {
                        this.employee = new Manager(name, id, email, officeNumber, position);
                            employeeArray.push(employee);
                            resolve("done1");
                        });
                    } else if (position === "Engineer") {
                        runInquirerEngineer().then(function ({ github }) {
                            this.employee = new Engineer(name, id, email, github, position);
                            employeeArray.push(employee);
                            resolve("done2");
                        });
                    } else if (position === "Intern") {
                        runInquirerIntern().then(function ({ school }) {
                            this.employee = new Intern(name, id, email, school, position);
                            employeeArray.push(employee);
                            resolve("done3");
                        });
                    }
                }).catch(function (err) {
                    console.log("There was an error.");
                    console.log(err);
                });
            }); 
            const result = await promise;
            await inquirer.prompt(goAgain).then(function ({booleanAnswer}) {
                runAgain = booleanAnswer;
            } );
    }

    function displayTitle(employee) {
        if (employee.position === "Manager") {
            return `office number: ${employee.officeNumber}`;
        }
        if (employee.position === "Intern") {
            return `school: ${employee.school}`;
        }
        if (employee.position === "Engineer") {
            return `gitHub: ${employee.github}`;
        }
    }
    function getCardHtml() {
        let html = "";
        for (j = 0; j < employeeArray.length; j++) {
            html += `<div class="card bg-dark justify-content-center align-items-center" style="width: 18rem;">
                <div class="col card-header">
                <h4>${employeeArray[j].name}</h4>
                </div>
                <div class="col card-header">
                <h4>${employeeArray[j].getRole()}</h4 >
                </div >
                <ul class="list-group list-group-flush text">
                    <li class="list-group-item">ID: ${employeeArray[j].id}</li>
                    <li class="list-group-item">Email: ${employeeArray[j].email}</li>
                    <li class="list-group-item"> ${employeeArray[j].getRole()}</li> `
                    if(employeeArray[j].getRole() == "Intern") {
                        html += `<li class="list-group-item">School: ${employeeArray[j].school}</li>`
                    };
                    if(employeeArray[j].getRole() == "Engineer") {
                        html += `<li class="list-group-item">GitHub: ${employeeArray[j].github}</li>`
                    };
                
                html += `</ul>
                </div > `;
        }
        return html;
    }
    let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
    integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <title>Employee Profile</title>
    <style>
    .row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
    }
    .card {
    padding: 15px;
    border-radius: 6px;
    background-color: white;
    color: lightskyblue;
    margin: 15px;
    }
    .text {
    padding: 15px;
    border-radius: 6px;
    background-color: lightskyblue;
    color: black;
    margin: 15px;
    }
    .col {
    flex: 1;
    text-align: center;
    }
    </style>
    </head>
    <body>
    <nav class="navbar navbar-dark bg-dark justify-content-center align-items-center">
    <span class="navbar-brand mb-0 h1">
    <h1>My Team</h1>
    </span>
    </nav>
    <div class="row">
        ${getCardHtml()}
    </div>
    </body>
    </html>`;

    fs.writeFile('index.html', html, function (err) {
        if (err) throw err;
        console.log('File was created successfully.');
    });
};

runProgram();