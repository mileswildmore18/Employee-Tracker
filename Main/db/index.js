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



    viewAllDepartments() {
        return this.query(
            "SELECT * FROM department;"
        )
    }

    viewAllRoles() {
        return this.query(
            "SELECT * FROM role;"
        )
    }

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

    addEmployee() {
        return this.query(
            "INSERT INTO employees (employee_name, department, position, salary) VALUES ('John Doe', 'Sales', 'Sales Representative', 6);"
        )
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

    viewEmployeeManager() {
        return this.query(
            "SELECT e.first_name, e.last_name, m.manager_id FROM employees e JOIN employees m ON e.manager_id = m.id;"
        )
    }

    viewEmployeeDepartment() {
        return this.query(
            "SELECT employee.name, departments.department_name FROM employees JOIN departments ON employees.department_id = departments.department_id;"
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

    viewBudget() {
        return this.query(
            "SELECT category, SUM(amount) AS total_budget FROM budget_entries GROUP BY category;"
        )
    }

}

module.exports = new DB();