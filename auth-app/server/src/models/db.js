const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'843228',
    database: 'authentication'
});

module.exports = connection;