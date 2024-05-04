const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
const trackerChoices = ['View All Employees', 'Add Employee', 'Update Employee Role, View All Roles', 'Add Role', 'View All Departments', 'Add Department',
    'Update Employee Role', 'Update Employee Manager', 'View Employee Manager', 'View Employee Department',
    'Remove Employee', 'Remove Role', 'Remove Department', 'View Budget', 'Quit']

init();

//Display logo text, load main prompts
function init() {
    const logoText = logo({ name: "Employee Tracker" }).render();

    console.log(logoText);

    loadMainPrompts();
}
//Loads up the prompt for options
function loadMainPrompts() {
    prompt([
        {
            type: 'list',
            name: 'employeetrack',
            message: 'What would you like to do?',
            choices: trackerChoices,
        }
    ]).then((res) => {
        let userChoice;
        switch (res.trackerChoices) {
            case 'View All Employees':
                userChoice = new db.viewAllEmployees()
                break;
            case 'Add Employee':
                userChoice = new db.addEmployee()
                break;
            case 'Update Employee Role':
                userChoice = new db.updateEmployeeRole()
                break;
            case 'View All Roles':
                userChoice = new db.viewAllRoles()
                break;
            case 'Add Role':
                userChoice = new db.addRole()
                break;
            case 'View All Departments':
                userChoice = new db.viewAllDepartments()
                break;
            case 'Add Department':
                userChoice = new db.addDepartment()
                break;
            case 'Update Employee Role':
                userChoice = new db.updateEmployeeRole()
                break;
            case 'Update Employee Manager':
                userChoice = new db.updateEmployeeManager()
                break;
            case 'View Employee Manager':
                userChoice = new db.viewEmployeeManager()
                break;
            case 'View Employee Department':
                userChoice = new db.viewEmployeeDepartment()
                break;
            case 'Remove Employee':
                userChoice = new db.removeEmployees()
                break;
            case 'Remove Role':
                userChoice = new db.removeRole()
                break;
            case 'Remove Department':
                userChoice = new db.removeDepartment()
                break;
            case 'View Budget':
                userChoice = new db.viewBudget()
                break;
        }
    }


    )
}

function viewAllEmployees() {
    const query = 'SELECT * FROM employees'
    
    
    }


function viewEmployeeDepartment() {

}

function viewEmployeeManager() {

}

function removeEmployees() {

}

function updateEmployeeRole() {

}

function updateEmployeeManager() {

}

function viewAllRoles() {

}

function addRole() {

}

function removeRole() {

}

function viewAllDepartments() {

}

function addDepartment() {

}

function removeDepartment() {

}

function viewBudget() {

}

function addEmployee() {

}
//Exit the Application
function quit() {
    console.log("Goodbye!");
    process.exit();
}
