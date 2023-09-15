const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const app = express();

const port = 3001;

//making the MYSQL connection
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1234five",
  database: "employeeTracker_db",
});

connection.connect((err) => {
  console.log("Connection to database is made!");
  //start inquirer
  start();
});
//starts the fixed executions that the script can do
function start() {
  inquirer
    .prompt({
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add a Department",
        "Add a new Role",
        "Add a new Employee",
        "Exit",
      ],
    })
    .then((answers) => {
      switch (answers.action) {
        case "View All Departments":
          viewAllDepartments();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "Add a Department":
          addDepartment();
          break;
        case "Add a new Role":
          addRole();
          break;
        case "Add a new Employee":
          addEmployee();
          break;
        case "View All Employees":
          viewAllEmployees();
          break;
        case "Update Employee Info":
          updateEmployeeInfo();
          break;
        case "Exit":
          exit();
          break;
      }
    });
}
// view all departments
function viewAllDepartments() {
  const query = "SELECT * FROM departments";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}
//view all roles
function viewAllRoles() {
  const query = "SELECT * FROM roles";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}
//add department to departments table
function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      name: "name",
      message: "Enter new department name:",
    })
    .then((answers) => {
      const query = `INSERT INTO departments(department_name) VALUES ('${answers.name}')`;
      connection.query(query, (err, res) => {
        if (err) throw err;
        console.log(`${answers.name} was added to the department database!`);
        start();
      });
    });
}
//addRole to role table
//inquirer not working smoothly
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Enter new role:",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary for new role?:",
      },
      {
        type: "input",
        name: "department",
        message: "Enter the department for this role:",
      },
    ])
    .then((answers) => {
      const query = `INSERT INTO roles(title,salary,department) VALUES (?,?,?)`;
      connection.query(
        query,
        [answers.title, answers.salary, answers.department],
        (err, res) => {
          if (err) throw err;
          console.log(
            `New role for ${answers.title} with a salary of ${answers.salary} for the department id of ${answers.department} has been added to the table:`
          );
          start();
        }
      );
    });
}

//function to view all employees
function viewAllEmployees() {
  const query =
    "SELECT * FROM employees JOIN roles ON employees.role_id=roles.id";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log("Viewing all employees..");
    console.table(res);
    start();
  });
}
//add employee to the employees table
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Enter new employee name:",
      },
      {
        type: "input",
        name: "last_name",
        message: "Enter new employee last name:",
      },
      {
        type: "input",
        name: "role_id",
        message: "What is new employees role (Enter INT):",
      },
    ])
    .then((answers) => {
      const query = `INSERT INTO employees(first_name,last_name,role_id) VALUES (?,?,?)`;
      connection.query(
        query,
        [answers.first_name, answers.last_name, answers.role_id],
        (err, res) => {
          if (err) throw err;
          console.log(
            `New employee added ${answers.first_name}, ${answers.last_name}, ${answers.role_id}`
          );
          start();
        }
      );
    });
}

//close the connection
function exit() {
  connection.end((err) => {
    if (err) {
      console.err("Error with closing connection with mysql");
      return;
    }
    console.log("Connection to mysql ended bye!");
  });
}

app.listen(port, (err) => {
  console.log("Server is listening at port 3001");
});
