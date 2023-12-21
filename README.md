# Employee Tracker Interface

  ## Description

Databases are foundational to full-stack web applications. This week's assignment builds upon our previous studies to add a final element to our stack: the database. MySQL is the most popular SQL database available - the fact that it is still so widely adopted despite being over four decades old speaks to its enduring usefulness. 

It is not uncommon for developers to be asked to create interfaces that make it easy for a layman to view and interact with information stored in databases in an intuitive, user-friendly manner.

With this in mind, this backend application functions as a Content Management System solution for managing a company's employees through the use of Node.js, MySQL database and the Inquirer npm library.

This application at the point of final submission deadline does not have full functionality - areas surrounding Employee information (displaying Employees, displaying Employees by Department or Updating an existing employee's role) do not currently work as intended. I have currently hit a wall in my attempts to debug this prior to submission, but intend to return to these issues and fix my code at the earliest opportunity.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents
  * [Licence](#licence)
  * [Installation](#installation)
  * [Screenshots](#screenshots)
  * [Video Walkthrough](#video-walkthrough)
  * [Questions](#questions)
  
## License

This application has the following licence:

MIT License

[Link to licence](https://opensource.org/licenses/MIT)

## Installation
    
  Follow the following steps to properly install this application:


  * Node.js must be installed. You can download the installer directly from the [Nodejs website](https://nodejs.org). Alternatively, if you have Homebrew installed as the de facto package manager for macOS, you can simply type:

```bash
brew install node
```

  * Your next step is to initialize a project by creating a package.json file that will keep track of libraries installed for use in your application by adding the installed package's name and version. This is achieved by typing the following in the command line:

```bash
npm init -y
```

MySQL must be downloaded and installed also.
You can download the installer directly from the [MySQL website](https://dev.mysql.com/downloads/installer). Alternatively, if you have Homebrew installed as the de facto package manager for macOS, you can simply type:

```bash
brew install mysql
```
Proficiency with the MySQL command line prompt is encouraged, but GUI's such as MySQL Workbench can also be used to provide access to the database (I personally used TablePlus during the creation of my application). 

We will then connect our Node.js servers to our MySQL databases to perform queries based on client requests and return responses accordingly.

  * This command line application makes use of the following two dependencies:

  * Uses the [inquirer package](https://www.npmjs.com/package/express) to prompt and gather input from the user.

  * Uses the [mysql2 package](https://www.npmjs.com/package/uuid) as a popular choice for connecting to MySQL databases from Node.js applications due to its access to asynchronous operations.

  * Uses the [console.table package](https://www.npmjs.com/package/console.table) for convenience's sake as a means of beautifying how tables present in the terminal.

  * To install these packages, run the following commands from within the CLI at the root of the application:

```bash
npm i inquirer
```
```bash
npm i mysql2
```

```bash
npm i console.table
```

  * And finally: 

  Please type the following command within the terminal to invoke the application:

```bash
npm start
```

## Screenshots

![Initialising Employee Database](./assets/Initialise%20Database.png)

![Example of View List Function (Role)](./assets/Example%20of%20view%20function.png)

![Example of Adding Row Function (Department)](./assets/Add%20function.png)

![Example of Successful Data Insertion (Department)](./Assets/New%20Insertion.png)

## Video Walkthrough

[Link to video walkthrough of Employee Tracker ](https://drive.google.com/file/d/18QkeRGEHWhH13Qtn7NsjaUoQbcQjYVM0/view)

      
## Questions
      
  For further questions:

  If you have any further questions or feedback at this time regarding the repo or application, my contact info can be found as below.
  
  Contact Info:

  GitHub: [Lllewisreynolds](https://github.com/Lllewisreynolds)

  Email: [lsreynolds108@gmail.com](mailto:lsreynolds108@gmail.com)