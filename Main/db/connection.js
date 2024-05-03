const {Pool} = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'posgres',
    password: 'rootroot', // ! Change this to your own password
    database: 'employees',
    port: 5432 // Dfault PostgreSQL port
});

module.exports = pool;