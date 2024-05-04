--Add multiple names in the table of employee names and inserting data into employees
INSERT INTO employees (employee_id, first_name, last_name, role_id, department, salary manager_id ) VALUES
(1, 'John', 'Doe', 'Sales Lead'),
(2, 'Mike', 'Chan', 'SalesPerson'),
(3, 'Ashley', 'Rodriguez', 'Lead Engineer'),
(4, 'Kevin', 'Tupik', 'Software Engineer'),
(5, 'Kunal', 'Singh', 'Account Manager'),
(6, 'Malia','Brown', 'Acccountant'),
(7, 'Sarah', 'Lourd', 'Legal Team Lead'),
(8, 'Tom', 'Allen', 'Lawyer');

INSERT INTO department (department_id, department_name)
(1, 'Sales'),
(2, 'Engineering'),
(3, 'Finance'),
(4, 'Legal');


INSERT INTO roles (id, role_title, salary, department)
(1, 'Sales Lead','Sales',),
(2, 'Salesperson', 'Sales'),
(3, 'Lead Engineer', 'Engineering'),
(4, 'Software Engineer', 'Engineering'),
(5, 'Account Manager', 'Finance' ),
(6, 'Acccountant', 'Finance' ),
(7, 'Legal Team Lead', 'Legal'),
(8, 'Lawyer', 'Legal' );