/* A series of INSERT statements used to populate several tables within the employees database as established in schema
Seeds file used to pre-populate database, making the development of individual features much easier as per README suggestion */

-- Data insertion for Department Table
INSERT INTO department (id, name) VALUES (1, 'X-Files Div.');
INSERT INTO department (id, name) VALUES (2, 'Criminal Investigative Div.');
INSERT INTO department (id, name) VALUES (4, 'Behavioural Science Div.');
INSERT INTO department (id, name) VALUES (10, 'Fringe Div.');

-- Data insertion for Role Table
INSERT INTO role (title, salary, departmentID) VALUES ("Contract Specialist", 80000, 10);
INSERT INTO role (title, salary, departmentID) VALUES ("Contract Linguist", 10000, 4);
INSERT INTO role (title, salary, departmentID) VALUES ("Special Agent (field-based)", 90000, 2);
INSERT INTO role (title, salary, departmentID) VALUES ("Special Agent (hybrid)", 90000, 1);
INSERT INTO role (title, salary, departmentID) VALUES ("Forensic Psychologist", 10000, 4);
INSERT INTO role (title, salary, departmentID) VALUES ("Extraterrestrial Specialist)", 143000, 1);
INSERT INTO role (title, salary, departmentID) VALUES ("Chair (Multiversal Affairs)", 300000, 10);
INSERT INTO role (title, salary, departmentID) VALUES ("Junior Agent (lab-based)", 60000, 10);
INSERT INTO role (title, salary, departmentID) VALUES ("FBI Assistant Director", 400000, 1);

/* Demonstrative example of how different tables are interconnected in a database 
Adding data to one table (e.g., employees) requires referencing IDs from other tables (in this instance, departments & roles) for consistency & data integrity */

-- Data insertion for Role Table
INSERT INTO employee (firstName, lastName, roleID, managerID) VALUES ('Fox', 'Mulder', 4, null);
INSERT INTO employee (firstName, lastName, roleID, managerID) VALUES ('Dana', 'Skully', 4, null);
-- managerID field can be null for employees in leadership positions who don't have a manager listed
INSERT INTO employee (firstName, lastName, roleID, managerID) VALUES ('Walter', 'Skinner', 9, 1);
INSERT INTO employee (firstName, lastName, roleID, managerID) VALUES ('Olivia', 'Dunham', 1, null);
INSERT INTO employee (firstName, lastName, roleID, managerID) VALUES ('Astrid', 'Farnsworth', 8, null);
INSERT INTO employee (firstName, lastName, roleID, managerID) VALUES ('Philip', 'Broyles', 10, 2);
INSERT INTO employee (firstName, lastName, roleID, managerID) VALUES ('Clarice', 'Starling', 5, null);
INSERT INTO employee (firstName, lastName, roleID, managerID) VALUES ('Dale', 'Cooper', 3, null);
INSERT INTO employee (firstName, lastName, roleID, managerID) VALUES ('Philip', 'Jeffries', 3, null);
INSERT INTO employee (firstName, lastName, roleID, managerID) VALUES ('Gordon', 'Cole', 9, 3);