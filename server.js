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
  
  /* Previously established connection object used to connect to database
     via calling of connect method */
  connection.connect(function(err) {
    if (err) throw err;
  /* threadId property logged to console - provides unique ID assigned to the current connection established between application and server
     Backstop to prevent potential conflict/confusion when multiple users access the database concurrently */
    console.log("connected as ID " + connection.threadId);
  // Console cleared prior to displaying welcome message
    console.clear();
    console.log(" /\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\");
    console.log("");
    console.log("          WELCOME TO THE EMPLOYEE DATABASE          ");
    console.log("");
    console.log(" \\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\");
    initEmployeeDBPrompt();
  });

// Functions defined for viewing employees, department and role tables - querying the database and then displaying that retrieved information in the console
// Will be called within initEmployeeDBPrompt later
function displayEmployees() {
    /* Columns aliased for readability & easy user comprehension in console
    Optional Manager information is left joined on the employees table, where the current employee's managerID is matched with another employee's id
    CONCAT function used to combine manager first and last name into one new 'Manager' Column*/
    connection.query("SELECT employees.firstName AS First_Name, employees.lastName AS Last_Name, role.title AS Title, role.salary AS Salary, department.name AS Department, CONCAT(e.firstName, ' ' ,e.lastName) AS Manager FROM employees INNER JOIN role on role.id = employees.roleID INNER JOIN department on department.id = role.departmentID LEFT JOIN employees e on employees.managerID = e.id;", 
    function(err, res) {
      if (err) throw err
      console.log ("");
      console.log("\x1b[33m          **  EMPLOYEES LIST  **          \x1b[0m");
      console.log ("");
      console.table(res)
      initEmployeeDBPrompt()
  })
}

function displayDepts() {
    connection.query("SELECT department.id AS ID, department.name AS Department FROM department",
    function(err, res) {
      if (err) throw err
      console.log("")
      console.log(("\x1b[33m          **  DEPARTMENT LIST  **          \x1b[0m"));
      console.log("")
      console.table(res)
      initEmployeeDBPrompt();
  })
}

function displayRoles() {
    connection.query("SELECT role.id AS Dept_ID, role.title AS Title FROM role",
    function(err, res) {
      if (err) throw err
      console.log("")
      console.log(("\x1b[33m          **  ROLE LIST  **          \x1b[0m"))
      console.log("")
      console.table(res)
      initEmployeeDBPrompt()
  })
}

function displayEmployeesByDept() {
    connection.query("SELECT employees.firstName AS First_Name, employees.lastName AS Last_Name, department.name AS Department FROM employees JOIN role ON employees.roleID = role.id JOIN department ON role.departmentID = department.id ORDER BY department.id;", 
    function(err, res) {
      if (err) throw err
      console.log ("");
      console.log(("\x1b[33m          **  EMPLOYEES LISTED BY DEPARTMENT  **          \x1b[0m"))
      console.log ("");
      console.table(res)
      initEmployeeDBPrompt()
    })
  }
 
  // Using inquirer library to gather necessary information for new employee and insert into database
function insertEmployee() {  
    inquirer.prompt([
        {
          name: "firstName",
          type: "input",
          message: "First Name: "
        },
        {
          name: "lastName",
          type: "input",
          message: "Last Name: "
        },
        {
          name: "role",
          type: "list",
          message: "What is the new member of staff's job title? ",
          choices: roleChoices()
        },
        {
            name: "choice",
            type: "rawlist",
            message: "Does the new member of staff have a direct manager? If so, please select from the following: ",
            choices: managerChoices()
        }

    // Once user answers all prompts, the then function is called to retrieve answers object carrying user input  
    ]).then(function (answers) {
    /* roleId and managerId calculated by finding chosen option's index in the respective arrays returned by roleChoices and managerChoices
     1 added to account for potential zero-based indexing mismatch between Javascript (zero-based) and the potential for the database to use IDs starting with 1 */
      var roleId = roleChoices().indexOf(answers.role) + 1
      var managerId = ManagerChoices().indexOf(answers.choice) + 1
      connection.query("INSERT INTO employees SET ?", 
      {
          firstName: answers.firstName,
          lastName: answers.lastName,
          managerID: managerId,
          roleID: roleId
          
      }, 
      function(err){
          if (err) throw err
          console.table(answers)
          initEmployeeDBPrompt()
      })

  })
 }


//   addrole func 
//   adddepartment func

//   updateemployee func

let roleArray = [];                                            
function roleChoices() {
  connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      roleArray.push(res[i].title);
    }
  })
  return roleArray;
}

let managerArray = [];
function managerChoices() {
  connection.query("SELECT firstName, lastName FROM employees", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      managerArray.push(res[i].firstName);
    }
  })
  return managerArray;
}