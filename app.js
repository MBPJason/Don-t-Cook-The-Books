const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "accountantDB",
});

connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  console.log("Here are the books...");
  start();
});

function start() {
  inquirer
    .prompt({
      name: "startingLine",
      type: "list",
      message: "What would you like to do?",
      choices: ["View All Departments", "View All Roles", "View All Employees"],
    })
    .then(function ({ startingLine }) {
      if (startingLine === "View All Departments") {
        departmentChoices();
      } else if (startingLine === "View All Roles") {
        roleChoices();
      } else if (startingLine === "View All Employees") {
        employeeChoices();
      }
    });
}

function departmentChoices() {
  connection.query("SELECT * FROM department;", function (err, results) {
    if (err) throw err;
    console.table(results);
  });
  inquirer
    .prompt({
      name: "departments",
      type: "list",
      message: "What would you like to do?",
      choices: ["Add a department", "Delete a department", "Go back"],
    })
    .then(function ({ departments }) {
      if (departments === "Add a department") {
        addItem(department);
      } else if (departments === "Delete a department") {
        deleteItem(department);
      } else if (departments === "Go back") {
        start();
      }
    });
}

function roleChoices() {
  connection.query("SELECT * FROM role;", function (err, results) {
    if (err) throw err;
    console.table(results);
  });
  inquirer
    .prompt({
      name: "roles",
      type: "list",
      message: "What would you like to do?",
      choices: ["Add a role", "Delete a role", "Go back"],
    })
    .then(function ({ roles }) {
      if (roles === "Add a role") {
        addItem(role);
      } else if (roles === "Delete a role") {
        deleteItem(role);
      } else if (roles === "Go back") {
        start();
      }
    });
}

function employeeChoices() {
  connection.query("SELECT * FROM employee;", function (err, results) {
    if (err) throw err;
    console.table(results);
  });
  inquirer
    .prompt({
      name: "employees",
      type: "list",
      message: "What would you like to do?",
      choices: ["Add a employee", "Delete a employee", "Go back"],
    })
    .then(function ({ employees }) {
      if (employees === "Add a employee") {
        addItem(employee);
      } else if (employees === "Delete a employee") {
        deleteItem(employee);
      } else if (employees === "Go back") {
        start();
      }
    });
}
