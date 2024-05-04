--Add multiple names in the table of employee names and inserting data into employees
INSERT INTO department (department_id, department_name) VALUES
(1, 'Sales'),
(2, 'Engineering'),
(3, 'Finance'),
(4, 'Legal');

INSERT INTO role (id, title, salary, department_id) VALUES
(1, 'Sales Lead', 100000, 1),
(2, 'Salesperson', 80000, 1),
(3, 'Lead Engineer', 150000, 2),
(4, 'Software Engineer', 120000, 2),
(5, 'Account Manager', 160000, 3),
(6, 'Acccountant', 125000, 3),
(7, 'Legal Team Lead', 250000, 4),
(8, 'Lawyer', 190000, 4);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id) VALUES
( 1, 'John', 'Doe', 1, 1),
( 2, 'Mike', 'Chan', 2, NULL),
( 3, 'Ashley', 'Rodriguez', 3, 3),
( 4, 'Kevin', 'Tupik', 4, NULL),
( 5, 'Singh', 'Kunal', 5, 5),
( 6, 'Malia','Brown', 6, NULL),
( 7, 'Sarah', 'Lourd', 7, 7),
( 8, 'Tom', 'Allen', 8, NULL);
