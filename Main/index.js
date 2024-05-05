const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
const trackerChoices = ['View All Employees', 'View All Roles', 'View All Departments', 'View Employee Manager','View Employee Department','View Budget', 
                        'Add Employee', 'Add Role', 'Add Department',
                        'Update Employee Role', 'Update Employee Manager',  
                        'Remove Employee','Remove Role', 'Remove Department',
                        'Quit']
const role = ['Sales Lead','Salesperson','Lead Engineer','Software Engineer','Account Manager','Acccountant','Legal Team Lead','Lawyer', 'Customer Service',]

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
            // Pull up the employee manager with choices of people in the company
            case 'View Employee Manager':
                db.viewAllEmployees().then(({rows})=> {
                    //take rows back from viewALLEmployee, loops and creates an array of the id, last and first name
                    const managers = rows.map(({id, first_name, last_name})=>({
                        //setting name and value of the choices
                        name: `${first_name} ${last_name}`,
                        value: id
                    }));
                    //prompt for user to pick a choice from the managers listed
                    prompt([
                        {type: 'list',
                         name: 'manager',
                         message: "Who is the employee's manager?",
                         choices: managers
                    }
                    //Loop through employee arrays of managers, setting up the prompt
                    ]).then((res)=>{
                        //id of manager
                        db.viewEmployeeManager(res.manager)
                        .then(({rows})=>{
                        console.table(rows)           
                        })
                    })
                })
                break;
            
            case 'View Employee Department':
                db.viewAllDepartments().then(({rows})=> {
                    //take rows back from viewALLEmployee, loops and creates an array of the id, last and first name
                    const departments = rows.map(({department_id, department_name})=>({
                        //setting name and value of the choices
                        name: `${department_name}`,
                        value: department_id
                    }));
                    //prompt for user to pick a choice from the managers listed
                    prompt([
                        {type: 'list',
                         name: 'department',
                         message: "Where is the department?",
                         choices: departments
                    }
                    //Loop through employee arrays of managers, setting up the prompt
                    ]).then((res)=>{
                        //id of manager
                        db.viewEmployeeDepartment(res.department)
                        .then(({rows})=>{
                        console.table(rows)           
                        })
                    })
                })
                break;
            
            case 'View Budget':
                db.viewBudget().then(({rows})=> {
                    console.table(rows)   
                })
                break;    
            
            case 'Add Employee':
                
                    prompt([
                        { 
                            type: 'input',
                            name: 'firstname',
                            message: "What is the employee's first name?",
                        },
                        {
                            type: 'input',
                            name: 'lastname',
                            message: "What is the employee's last name?",
                        },
                        {
                            type: 'list',
                            name: 'role',
                            message: "What is the employee's role?",
                            choices: role,   
                        },
                        {
                            type: 'list',
                            name: 'manager',
                            message: "Who is the employee's manager?",
                            choices: manager,
                        }
                    ])
                    .then((res)=>{
                        let {firstname, lastname, role, manager} = res;
                    db.addEmployee(firstname, lastname, role, manager)
                    .then(()=>{
                        console.log('Employee has been added');
                    })
                    
                })
                break;
            }
                
               
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
                
        })
    }


    
function mapEmployees(){
    let managers;
    db.viewAllEmployees().then(({rows})=> {
        managers = rows.map(({id, first_name, last_name})=>({
            name: `${first_name} ${last_name}`,
            value: id
        })).then(()=> {

        })
    })
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
