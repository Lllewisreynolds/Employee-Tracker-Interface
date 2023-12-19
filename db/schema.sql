-- These series of statements constitute instructions for building the foundation of a database to manage employee information

-- Establishes clean slate: if database were to already exist, it would be dropped before proceeding as pre-emptive measure
DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
-- Newly-created database specified for all future operations
USE employees_db;

CREATE TABLE employee (
    -- Creates unique identifier for each employee that has been set to auto-increment
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   Any numbers presented within parenthesis dictate the maximum amount of characters allowed 
  firstName VARCHAR (30),
  lastName VARCHAR (30),
  roleID INT,
  managerID INT
);

CREATE TABLE department (
  id INT(11) PRIMARY KEY,
  name VARCHAR (30)
);

CREATE TABLE role (
  id INT(11) AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR (30),
--   salary is slightly different - second number dictates up to 2 decimal places will be accepted
  salary DECIMAL(9,2),
  departmentID INT
);