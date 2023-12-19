// Importation of necessary Node modules/libraries as listeds in dependencies 

const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

// Invoking the mysql2 module's native creativeConnection function 
const connection = mysql.createConnection({
    // Function takes object as argument made up of the configuration details necessary to establish connection
    host: "localhost",
    // default port for the classic MySQL protocol - can specify your own designated port otherwise
    port: 3306,
    // Enter your own mySQL username here if set - otherwise defaults to root
    user: "root",
    // Enter your own mySQL password here if you have one set:
    password: "", 
    database: "employees_db"
  });
