// Importation of necessary Node modules/libraries as listeds in dependencies 

const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

// Global variables declared
let roleArray = []; 
let managerArray = [];
var departmentArray = [];

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
    console.log("    WELCOME TO THE EMPLOYEE DATABASE       ");
    console.log("");
    console.log(" \\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\");
    initEmployeeDBPrompt();
  });

  /* Main initialising function to begin user prompt
     Uses switch statements as a means of routing to dedicated functions depending on user input */
  function initEmployeeDBPrompt() {
    inquirer.prompt([
    {
    type: "list",
    message: "What would you like to do today?",
    name: "action",
    choices: [
            "View Current Employees", 
            "View Current Departments",
            "View Current Roles",
            "View Current Employees by Department",
            "Add a New Employee",
            "Add a New Department",
            "Add a New Role",
            "Update Current Employee Role",
            "Exit"
            ]
    }
]).then(function(answers) {
        switch (answers.action) {

            case "View Current Employees":
                displayEmployees();
                console.log(
                    `You chose to ${answers.action.toLowerCase()}. Please proceed with the next steps.`
                  );
            break;

            case "View Current Departments":
                displayDepts();
                console.log(
                    `You chose to ${answers.action.toLowerCase()}. Please proceed with the next steps.`
                  );
            break;

            case "View Current Roles":
                displayRoles();
                console.log(
                    `You chose to ${answers.action.toLowerCase()}. Please proceed with the next steps.`
                  );
            break;
                
            case "View Current Employees by Department":
                displayEmployeesByDept();
                console.log(
                    `You chose to ${answers.action.toLowerCase()}. Please proceed with the next steps.`
                  );
            break;

            case "Add a New Employee":
                insertEmployee();
                console.log(
                    `You chose to ${answers.action.toLowerCase()}. Please proceed with the next steps.`
                  );
            break;

            case "Add a New Department":
                insertDept();
                console.log(
                    `You chose to ${answers.action.toLowerCase()}. Please proceed with the next steps.`
                  );
            break;

            case "Add a New Role":
                insertRole();
                console.log(
                    `You chose to ${answers.action.toLowerCase()}. Please proceed with the next steps.`
                  );
            break;

            case "Update Current Employee Role":
                updateExistingEmployeeRole();
                console.log(
                    `You chose to ${answers.action.toLowerCase()}. Please proceed with the next steps.`
                  );
            break;

            case "Exit":
                console.log(" /\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\");
                console.log("");
                console.log("    NOW EXITING EMPLOYEE DATABASE       ");
                console.log("");
                console.log(" \\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\");
                connection.end();
                break;
            }
    })
};

// Functions defined for viewing employees, department and role tables - querying the database and then displaying that retrieved information in the console
// Will be called within initEmployeeDBPrompt later
function displayEmployees() {
    /* Columns aliased for readability & easy user comprehension in console
    Optional Manager information is left joined on the employees table, where the current employee's managerID is matched with another employee's id
    CONCAT function used to combine manager first and last name into one new 'Manager' Column*/
    connection.query("SELECT employee.firstName AS First_Name, employee.lastName AS Last_Name, role.title AS Title, role.salary AS Salary, department.name AS Department, CONCAT(e.firstName, ' ' ,e.lastName) AS Manager FROM employee INNER JOIN role on role.id = employee.roleID INNER JOIN department on department.id = role.departmentID LEFT JOIN employee e on employee.managerID = e.id;", 
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
    connection.query("SELECT employee.firstName AS First_Name, employee.lastName AS Last_Name, department.name AS Department FROM employee JOIN role ON employee.roleID = role.id JOIN department ON role.departmentID = department.id ORDER BY department.id;", 
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
      var managerId = managerChoices().indexOf(answers.choice) + 1
      connection.query("INSERT INTO employee SET ?", 
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

//   updateExistingEmployeeRole func

// roleChoices, managerChoices & departmentChoices are Helper functions providing data for insertEmployee function to use as choices for prompts
function roleChoices() {
  connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err
    // for loop iterates through query results, extracts data
    for (var i = 0; i < res.length; i++) {
      // Pushes data to two arrays declared in global scope
      roleArray.push(res[i].title);
    }
  })
  return roleArray;
}

function managerChoices() {
  connection.query("SELECT firstName, lastName FROM employee", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      managerArray.push(res[i].firstName);
    }
  })
  return managerArray;
}

function insertDept() { 

    inquirer.prompt([
        {
          name: "name",
          type: "input",
          message: "What Department will you add at this time? "
        },
        {
            name: "id",
            type: "input",
            message: "Please provide a new Department ID number: "
          }

    ]).then(function(answers) {
        connection.query("INSERT INTO department SET ? ",
            {
              name: answers.name,
              id: answers.id
            },
            function(err, res) {
                if (err) throw err
                console.table(res);
                initEmployeeDBPrompt();
            }
        )
    })
  }

  function insertRole() { 
    connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role LEFT JOIN department.name AS Department FROM department;",   function(err, res) {
      inquirer.prompt([
          {
            name: "title",
            type: "input",
            message: "What is the title of the new role you wish to add?"
          },
          {
            name: "salary",
            type: "input",
            message: "What is the associated salary of the position?"
          } ,
          {
            name: "department",
            type: "rawlist",
            message: "Please choose which department this role will be assigned to:",
            choices: departmentChoices()
          }
      ]).then(function(answers) {
          var deptId = departmentChoices().indexOf(answers.choice) + 1
          connection.query(
              "INSERT INTO role SET ?",
              {
                title: answers.title,
                salary: answers.salary,
                departmentID: deptId
              },
              function(err) {
                  if (err) throw err
                  console.table(answers);
                  initEmployeeDBPrompt();
              }
          )     
      });
    });
};

function departmentChoices() {
    /* The departmentChoices() works the same as other 2 helper functions: fetchs all department names from the department table,
       Loops through retrieved data and pushes each department name into an array
       Then returns the populated departmentArray containing all available departments */
  connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      departmentArray.push(res[i].name);
    }
})
return departmentArray;
}

// Final helper function - enables user to modify existing employee's job title within the database
function updateExistingEmployeeRole() {
    connection.query("SELECT employee.lastName, role.title FROM employee JOIN role ON employee.roleID = role.id;", 
    (err, res) => {
            if (err) throw err;
 
            inquirer.prompt([
                {
                    name: "lastName",
                    type: "rawlist",
                    choices: function () {
                        var lastName = [];
                        for (var i = 0; i < res.length; i++) {
                            lastName.push(res[i].lastName);
                        }
                        return lastName;
                    },
                    message: "What is the existing employee's last name? ",
                },
                {
                    // prompts for new choices
                    name: "role",
                    type: "rawlist",
                    message: "What is the employee's new job title moving forward? ",
                    choices: roleChoices()
                },
            ]).then(function (answers) {
                // Updating the employee's role in the database based on their choices
                var roleId = roleChoices().indexOf(answers.role) + 1;
                connection.query("UPDATE employees SET WHERE ?",
                    {
                        lastName: answers.lastName,
                        roleID: roleId
                    },
                    // Handling the results and prompting for further action
                    function (err) {
                        if (err)
                            throw err;
                        console.table(answers);
                        initEmployeeDBPrompt();
                    });
            });
        });
  }