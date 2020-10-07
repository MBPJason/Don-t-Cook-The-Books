const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Ja50NO9!59#",
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
      choices: ["View All Departments", "View All Roles", "View All Employees", "Close Books"],
    })
    .then(function ({ startingLine }) {
      if (startingLine === "View All Departments") {
        departmentChoices();
      } else if (startingLine === "View All Roles") {
        roleChoices();
      } else if (startingLine === "View All Employees") {
        employeeChoices();
      } else if (startingLine === "Close Books") {
        connection.end();
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

function addItem(item) {}

async function addItem(item) {
  if (err) throw err;
  if (item === department) {
    let { add } = await inquirer.prompt([
      {
        name: "add",
        type: "input",
        message: "What is the name of the department you want to add?",
      },
    ]);
    connection.query(
      `INSERT INTO ${item} SET ?;`,
      {
        name: add,
      },
      function (err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " department inserted!\n");
        start();
      }
    );
  } else if (item === role) {
    let { add, money } = await inquirer.prompt([
      {
        name: "add",
        type: "input",
        message: "What is the name of the role you want to add?",
      },
      {
        name: "money",
        type: "input",
        message: "How much should this role get paid?",
      },
    ]);
    const chooseDepartment = connection.query(
      "SELECT * FROM departments",
      async function (err, results) {
        if (err) throw err;
        
        const { department } = await inquirer.prompt({
            name: "department",
            type: "list",
            message: "Which department does this role belong to?",
            choice: [results.name]
        })
        let data = results.forEach(options => {
            if (options.name == department) {
                return options.id;
            };
        });

        return data;
      }
    );
    connection.query(
      `INSERT INTO ${item} SET ?;`,
      {
        title: add,
        salary: money,
        department_id: chooseDepartment
      },
      function (err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " role inserted!\n");
        start();
      }
    );
  } else if (item === employee) {
    let { first, last } = await inquirer.prompt([
        {
          name: "first",
          type: "input",
          message: "What is the first name of this employee?",
        },
        {
          name: "last",
          type: "input",
          message: "What is the last name of this employee?",
        },
      ]);
      const chooseRole = connection.query(
        "SELECT * FROM role",
        async function (err, results) {
          if (err) throw err;
          
          const { role } = await inquirer.prompt({
              name: "role",
              type: "list",
              message: "Which role is this employee gonna take?",
              choice: [results.name]
          })
          let data = results.forEach(options => {
              if (options.name == role) {
                  return options.id;
              };
          });
  
          return data;
        }
      );
    connection.query(
      `INSERT INTO ${item} SET ?;`,
      {
        first_name: first,
        last_name: last,
        role_id: chooseRole
      },
      function (err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " inserted!\n");
        start();
      }
    );
  }
}
