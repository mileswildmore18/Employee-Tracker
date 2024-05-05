const pool = require('./connection');

class DB {
    constructor() {}

    async query(sql, args = []) {
        const client = await pool.connect();
        try {
            const result = await client.query(sql, args);
            return result;
        }   finally {
            client.release();
        }
    }
    //Find all employees, join with roles and departments to display their roles, salaries, department and ID
    findAllEmployees() {
        return this.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS departments");
    
    }
    // Find all employees except the given employee id
    findAllEmployeesNoID() {
        return this.query(
            "SELECT FROM employees WHERE id IS NULL OR id =''"
        )
    }


//displays all departments
    viewAllDepartments() {
        return this.query(
            "SELECT * FROM department;"
        )
    }
//displays all roles
    viewAllRoles() {
        return this.query(
            "SELECT * FROM role;"
        )
    }
//displays all employees
    viewAllEmployees() {
        return this.query(
            "SELECT * FROM employees;"
        )
    }

    addDepartment() {
        return this.query(
            "INSERT INTO department (department_name)"
        )
    }
    
    addRole() {
        return this.query(
            "INSERT INTO roles (role_id,) VALUES ('Manager');"
        )
        
    }

    addEmployee(first_name, last_name, role_id, manager_id) {
        return this.query(
            "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4);", [first_name, last_name, role_id, manager_id]
        );
    }

    updateEmployeeRole() {
        return this.query(
            "UPDATE role SET name =[name] WHERE id = [number];"
        )
    }

    updateEmployeeManager() {
        return this.query(
            "UPDATE manager_id SET name =[name] WHERE id = [number];"
        )
    }
//views the managers for each employee
    viewEmployeeManager(manager_id) {
        return this.query(
            "SELECT first_name, last_name, manager_id FROM employees WHERE manager_id = $1;",[manager_id]
        )
    }
//views the departments for each employee
    viewEmployeeDepartment(department_id) {
        return this.query(
            "SELECT first_name, last_name, department_name FROM employees JOIN role ON employees.id = role.id JOIN department ON role.department_id = department.department_id WHERE department.department_id = $1;",[department_id]
        )
    }

    removeEmployees() {
        return this.query(
            "DELETE FROM employees WHERE id =[number];"
        )
    }

    removeRole() {
        return this.query(
            "DELETE FROM role WHERE id =[number];"
        )
    }    

    removeDepartment() {
        return this.query(
            "DELETE FROM departments WHERE id =[number];"
        )
    }
//views the total budget in each department
    viewBudget() {
        return this.query(
            "SELECT department.department_id, department.department_name, SUM(role.salary) AS utilized_budget FROM employees JOIN role ON employees.role_id = role.id JOIN department on role.department_id = department.department_id GROUP BY department.department_id, department.department_name;"
        )
    }

}

module.exports = new DB();