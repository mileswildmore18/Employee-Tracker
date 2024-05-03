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
        user: '',
        // Enter PostgreSQL password
        password:'',
        host: 'localhost',
        database: 'employee_db'
 
   },
   console.log('Connected to the employee_db database!')
)

pool.connect();