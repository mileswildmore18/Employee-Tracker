const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
const trackerChoices = ['View All Employees', 'View All Roles', 'View All Departments', 'View Employee Manager', 'View Employee Department', 'View Budget',
    'Add Employee', 'Add Role', 'Add Department',
    'Update Employee Role', 'Update Employee Manager',
    'Remove Employee', 'Remove Role', 'Remove Department',
    'Quit']

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
                db.viewAllEmployees().then((employees) => {
                    console.table(employees.rows);
                }).then(() => {
                    loadMainPrompts();
                })

                break;

            case 'View All Roles':
                db.viewAllRoles().then((role) => {
                    console.table(role.rows);
                }).then(() => {
                    loadMainPrompts();
                })
                break;

            case 'View All Departments':
                db.viewAllDepartments().then((department) => {
                    console.table(department.rows);
                }).then(() => {
                    loadMainPrompts();
                })
                break;
            // Pull up the employee manager with choices of people in the company
            case 'View Employee Manager':
                db.viewAllEmployees().then(({ rows }) => {
                    //take rows back from viewALLEmployee, loops and creates an array of the id, last and first name
                    const managers = rows.map(({ id, first_name, last_name }) => ({
                        //setting name and value of the choices
                        name: `${first_name} ${last_name}`,
                        value: id
                    }));
                    //prompt for user to pick a choice from the managers listed
                    prompt([
                        {
                            type: 'list',
                            name: 'manager',
                            message: "Who is the employee's manager?",
                            choices: managers
                        }
                        //Loop through employee arrays of managers, setting up the prompt
                    ]).then((res) => {
                        //id of manager
                        db.viewEmployeeManager(res.manager)
                            .then(({ rows }) => {
                                if (rows.length == 0) {
                                    console.log('No employees')
                                } else {
                                    console.table(rows)
                                }
                            }).then(() => {
                                loadMainPrompts();
                            })
                    })
                })
                break;

            case 'View Employee Department':
                db.viewAllDepartments().then(({ rows }) => {
                    //take rows back from viewALLEmployee, loops and creates an array of the id, last and first name
                    const departments = rows.map(({ department_id, department_name }) => ({
                        //setting name and value of the choices
                        name: `${department_name}`,
                        value: department_id
                    }));
                    //prompt for user to pick a choice from the managers listed
                    prompt([
                        {
                            type: 'list',
                            name: 'department',
                            message: "Where is the department?",
                            choices: departments
                        }
                        //Loop through employee arrays of managers, setting up the prompt
                    ]).then((res) => {
                        //id of manager
                        db.viewEmployeeDepartment(res.department)
                            .then(({ rows }) => {
                                console.table(rows)
                            }).then(() => {
                                loadMainPrompts();
                            })
                    })
                })
                break;
            //Shows the total amount of the budget in each department
            case 'View Budget':
                db.viewBudget().then(({ rows }) => {
                    console.table(rows)
                }).then(() => {
                    loadMainPrompts();
                })
                break;

            case 'Add Employee':
                //Adding Employees based on the roles they ar chosen to do
                db.viewAllRoles().then(({ rows }) => {
                    const roles = rows.map(({ id, title }) => ({
                        name: `${title}`,
                        value: id
                    }))
                    db.viewAllEmployees().then(({ rows }) => {
                        const managers = rows.map(({ id, first_name, last_name }) => ({
                            name: `${first_name} ${last_name}`,
                            value: id
                        }))
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
                                choices: roles,
                            },
                            {
                                type: 'list',
                                name: 'manager',
                                message: "Who is the employee's manager?",
                                choices: managers,
                            }
                        ])
                            .then((res) => {
                                let { firstname, lastname, role, manager } = res;
                                db.addEmployee(firstname, lastname, role, manager)
                                    .then(() => {
                                        console.log('Employee has been added');
                                    }).then(() => {
                                        loadMainPrompts();
                                    })
                            })
                    })
                })

                break;
            case 'Add Role':
                //Adding roles to the department they are connected to
                db.viewAllDepartments().then(({ rows }) => {
                    const departments = rows.map(({ department_id, department_name }) => ({
                        name: `${department_name}`,
                        value: department_id
                    }))
                    prompt([
                        {
                            type: 'input',
                            name: 'role',
                            message: "What is the name of the role?",
                        },
                        {
                            type: 'input',
                            name: 'salary',
                            message: "What is the salary of the role?",
                        },
                        {
                            type: 'list',
                            name: 'department',
                            message: "Which department does the role belong to?",
                            choices: departments,
                        }
                    ])
                        .then((res) => {
                            let { role, salary, department } = res;
                            db.addRole(role, salary, department)
                                .then(() => {
                                    console.log(`Added role to the database`);
                                }).then(() => {
                                    loadMainPrompts();
                                })
                        })
                })
                break;

            case 'Add Department':
                //Adding new departments to the database
                db.viewAllDepartments().then(({ rows }) => {
                    const departments = rows.map(({ department_id, department_name }) => ({
                        name: `${department_name}`,
                        value: department_id
                    }))
                    prompt([
                        {
                            type: 'input',
                            name: 'department',
                            message: "What is the name of the department?",
                        },
                        {
                            type: 'list',
                            name: 'department_id',
                            message: "Which department does it belong to?",
                            choices: departments,
                        }

                    ])
                        .then((res) => {
                            let { department, department_id } = res;
                            db.addDepartment(department, department_id)
                                .then(() => {
                                    console.log(`Added the department to the database`);
                                }).then(() => {
                                    loadMainPrompts();
                                })
                        })
                })
                break;

            case 'Update Employee Role':
                //updating employee roles to another role
                db.viewAllEmployees().then(({ rows }) => {
                    const employees = rows.map(({ id, first_name, last_name }) => ({
                        name: `${first_name} ${last_name}`,
                        value: id
                    }))
                    db.viewAllRoles().then(({ rows }) => {
                        const roles = rows.map(({ id, title }) => ({
                            name: `${title}`,
                            value: id
                        }))

                        prompt([
                            {
                                type: 'list',
                                name: 'update',
                                message: "Which employee's role do you want to update?",
                                choices: employees
                            },
                            {
                                type: 'list',
                                name: 'role',
                                message: "Which role do you want to assign the selected employee?",
                                choices: roles
                            },
                        ])
                            .then((res) => {
                                let { update, role } = res;
                                db.updateEmployeeRole(update, role)
                                    .then(() => {
                                        console.log(`Updated employee's manager`);
                                    }).then(() => {
                                        loadMainPrompts();
                                    })
                            })
                    })
                })
                break;


            //updates the employee to another manager
            case 'Update Employee Manager':
                db.viewAllEmployees().then(({ rows }) => {
                    const employees = rows.map(({ id, first_name, last_name }) => ({
                        name: `${first_name} ${last_name}`,
                        value: id
                    }))
                    db.viewAllEmployees().then(({ rows }) => {
                        const managers = rows.map(({ id, first_name, last_name }) => ({
                            //setting name and value of the choices
                            name: `${first_name} ${last_name}`,
                            value: id
                        }));

                        prompt([
                            {
                                type: 'list',
                                name: 'update',
                                message: "Which employee do you want to update?",
                                choices: employees
                            },
                            {
                                type: 'list',
                                name: 'role',
                                message: "Which manager do you want to assign the employee to?",
                                choices: managers
                            },
                        ])
                            .then((res) => {
                                let { update, role } = res;
                                db.updateEmployeeRole(update, role)
                                    .then(() => {
                                        console.log(`Updated employee's role`);
                                    }).then(() => {
                                        loadMainPrompts();
                                    })
                            })
                    })
                })
                break;
            //Deletes an employee from the tracker
            case 'Remove Employee':
                db.viewAllEmployees().then(({ rows }) => {
                    const employees = rows.map(({ id, first_name, last_name }) => ({
                        name: `${first_name} ${last_name}`,
                        value: id
                    }))
                    prompt([
                        {
                            type: 'list',
                            name: 'employee',
                            message: "Who do you want to remove?",
                            choices: employees
                        },
                    ])
                        .then((res) => {
                            let { employee } = res;
                            db.removeEmployees(employee)
                                .then(() => {
                                    console.log(`Employee is no longer with the tracker`);
                                }).then(() => {
                                    loadMainPrompts();
                                })
                        })
                })
                break;

            //Deletes a role from the tracker
            case 'Remove Role':
                db.viewAllRoles().then(({ rows }) => {
                    const roles = rows.map(({ id, title }) => ({
                        name: `${title}`,
                        value: id
                    }))
                    prompt([
                        {
                            type: 'list',
                            name: 'role',
                            message: "Which role do you want to remove?",
                            choices: roles
                        },
                    ])
                        .then((res) => {
                            let { role } = res;
                            db.removeRole(role)
                                .then(() => {
                                    console.log(`Removed the role from the tracker`);
                                }).then(() => {
                                    loadMainPrompts();
                                })
                        })
                })
                break;

            //Deletes a department from the tracker
            case 'Remove Department':
                db.viewAllDepartments().then(({ rows }) => {
                    const departments = rows.map(({ department_id, department_name }) => ({
                        name: `${department_name}`,
                        value: department_id
                    }))
                    prompt([
                        {
                            type: 'list',
                            name: 'department',
                            message: "Which department do you want to remove?",
                            choices: departments
                        },
                    ])
                        .then((res) => {
                            let { department } = res;
                            db.removeDepartment(department)
                                .then(() => {
                                    console.log(`Removed the department from the tracker`);
                                }).then(() => {
                                    loadMainPrompts();
                                })
                        })
                })
                break;
            //Calls to exit the application
            case 'Quit':
                quit();
                break;
        }
    })
}
//Exit the application
function quit() {
    console.log("Goodbye!");
    process.exit();
}
