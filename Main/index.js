const express = require('express');
// Import and require Pool
const {Pool} = require('pg');

const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware
app.use(express.urlencoded({extended: false }));
app.use(express.json());

//Connect to the database
const pool = new Pool(
    {
        // Enter PostgreSQL username
        user: 'postgres',
        // Enter PostgreSQL password
        password:'rootroot',
        host: 'localhost',
        database: 'employee_db'
 
   },
   console.log('Connected to the employee_db database!')
)

pool.connect();

// Hardcoded query: DELETE FROM course_names WHERE id = 3;
pool.query(`DELETE FROM employees WHERE id = $1`, [3], (err, {rows}) => {
    if (err) {
      console.log(err);
    }
    console.log(rows);
  });
  
  // Query database
  pool.query('SELECT * FROM employees', function (err, {rows}) {
    console.table(rows);
  });
  
  // Default response for any other request (Not Found)
  app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  