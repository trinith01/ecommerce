const mysql = require('mysql2');
require('dotenv').config();
console.log(process.env.DB_HOST);



// Create a single MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',        // Replace with your database host
  user: 'root',     // Replace with your database user
  password: 'Password26816', // Replace with your database password
  database: 'c_ecommerce' // Replace with your database name
});

// Export a promise-based query function
const promiseConnection = connection.promise();

module.exports = promiseConnection;  