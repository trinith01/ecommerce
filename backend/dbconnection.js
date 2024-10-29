const mysql = require('mysql2');
require('dotenv').config();
console.log(process.env.DB_HOST);



// Create a single MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'iran', // Make sure this matches your MySQL user
  password: 'Mt202161534#', // Ensure the password is correct
  database: 'c_ecommerce', // Replace with your database name
});

// Export a promise-based query function
const promiseConnection = connection.promise();

module.exports = promiseConnection;  