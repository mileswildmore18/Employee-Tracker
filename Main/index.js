const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
const trackerChoices = ['View All Employees', 'View All Roles', 'View All Departments', 'View Employee Manager','View Employee Department','View Budget', 
                        'Add Employee', 'Add Role', 'Add Department',
                        'Update Employee Role', 'Update Employee Manager',  
                        'Remove Employee','Remove Role', 'Remove Department',
                        'Quit']
const role = ['Sales Lead','Salesperson','Lead Engineer','Software Engineer','Account Manager','Acccountant','Legal Team Lead','Lawyer', 'Customer Service',]
const manager = ['None', 'John Doe', 'Mike Chan', 'Ashley Rodriguez', 'Kevin Tupik', 'Kunal Singh', 'Malia Brown']
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
        console.log(res);
        let userChoice;
        switch (res.employeetrack) {
            case 'View All Employees':
                db.viewAllEmployees().then((employees)=> {
                console.table(employees.rows);
                })
                
            break; 

            case 'View All Roles':
                db.viewAllRoles().then((role)=> {
                    console.table(role.rows);
                })
                break;

            case 'View All Departments':
                db.viewAllDepartments().then((department)=> {
                    console.table(department.rows);
                })
                break;
            
            case 'View Employee Manager':
                db.viewEmployeeManager().then((employee)=> {
                    console.table(employee.rows);
                })
                break;
            
            // case 'View Employee Department':
            //     userChoice =  db.viewEmployeeDepartment()
            
            // case 'View Budget':
            //     userChoice =  db.viewBudget()    
            
            // case 'Add Employee':
            //     userChoice =  db.addEmployee()
                
               
            // case 'Add Role':
            //     userChoice =  db.addRole()
               
             
            // case 'Add Department':
            //     userChoice =  db.addDepartment()
            
            // case 'Update Employee Role':
            //     userChoice =  db.updateEmployeeRole()
                  
            // case 'Update Employee Role':
            //     userChoice =  db.updateEmployeeRole()
                
            // case 'Update Employee Manager':
            //     userChoice =  db.updateEmployeeManager()
                  
            
            // case 'Remove Employee':
            //     userChoice =  db.removeEmployees()
                
            // case 'Remove Role':
            //     userChoice =  db.removeRole()
             
            // case 'Remove Department':
            //     userChoice =  db.removeDepartment()
            
            // case 'Quit':
            //     userChoice = quit()
                
        }
    }


    )
}

function viewAllEmployees() {
    const query = 'SELECT * FROM employee;'
    console.table(query)

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
    
    // prompt([
    //     {
    //         type: 'input',
    //         name: 'firstname',
    //         message: "What is the employee's first name?",
    //     },
    //     {
    //         type: 'input',
    //         name: 'lastname',
    //         message: "What is the employee's first name?",
    //     },
    //     {    type: 'list',
    //          name: 'role',
    //          message: "What is the employee's role?",
    //          choices: role,   
    //     },
    //     {
    //         type: 'list',
    //         name: 'manager',
    //         message: "Who is the employee's manager?",
    //         choices: manager,
    //     }
    // ])
    // .then((res)=>{
    //     db.createEmployee(res.firstname, res.lastname, res.role, res.manager)
    // });
}

//Exit the Application
function quit() {
    console.log("Goodbye!");
    process.exit();
}
