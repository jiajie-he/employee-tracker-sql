const inquirer = require('inquirer');
const fs = require('fs');
const Employee = require('./lib/Emp');
const Role = require('./lib/Rol');
const Department = require('./lib/Dep');
const express = require('express');
const mysql = require('mysql2')
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

db.connect(function (err) {
    if (err) {
        throw err
    }
});
// const seeds = require('./db/seeds');

const team = []

function start() {
    console.log('Welcome to the Employee Tracker!')
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View All Departments', 'Add department', 'View all Roles', 'Add role', 'View all employees', 'Add employee', 'Update employee role', 'Quit'],
            name: 'selection'
        },
    ]).then(ans => {
        if (ans.selection === "View all employees") {
            allEmp();
        } else if (ans.selection === "Add employee") {
            addEmp();
        } else if (ans.selection === "Update employee role") {
            updateEmpRol();
        } else if (ans.selection === "View all Roles") {
            allRol();
        } else if (ans.selection === "Add role") {
            addRol();
        } else if (ans.selection === "View All Departments") {
            allDep();
        } else if (ans.selection === "Add department") {
            addDep();
        } else {
            console.log('Goodbye.');
            process.exit();
        }
    })
}

// viewing
function allEmp() {
    db.query('SELECT * FROM employee', function (err, data) {
        console.log('\n------------------------------------------------\n')
        console.table(data);
        console.log('\n------------------------------------------------\n')
    });
    start();
}

function allRol() {
    db.query('SELECT * FROM role', function (err, data) {
        console.log('\n------------------------------------------------\n')
        console.table(data);
        console.log('\n------------------------------------------------\n')
    });
    start();
}

function allDep() {
    db.query('SELECT * FROM department', function (err, data) {
        console.log('\n------------------------------------------------\n')
        console.table(data);
        console.log('\n------------------------------------------------\n')
    });
    start();
}

// adding
function addEmp() {
    db.query('SELECT * FROM role', function (err, data) {
        console.log('\n------------------------------------------------\n')
        console.table(data);
        console.log('\n------------------------------------------------\n')
    });
    inquirer.prompt([
        {
            type: 'input',
            message: "What is the employee's first name?",
            name: 'empFirst',
        },
        {
            type: 'input',
            message: "What is the employee's last name?",
            name: 'empLast',
        },
        {
            type: 'number',
            message: "What is the employee's role ID number?",
            name: 'roleList'
        },
        {
            type: 'input',
            message: "What is the manager's ID number?",
            name: 'managerList'
        },
    ]).then(ans => {
        db.query("INSERT INTO employee SET ?", {
            first_name: ans.empFirst, 
            last_name: ans.empLast, 
            role_id: ans.roleList, 
            manager_id: ans.managerList
        }, function (err,data) {
            if(err){
                throw err
            }
        })
        start();
    })
}

function addRol() {
    db.query('SELECT * FROM department', function (err, data) {
        console.log('\n------------------------------------------------\n')
        console.table(data);
        console.log('\n------------------------------------------------\n')
    });

    inquirer.prompt([
        {
            type: 'input',
            message: "What is the title of the role?",
            name: 'rolTitle',
        },
        {
            type: 'number',
            message: "What is the salary of the role?",
            name: 'roleSalary',
        },
        {
            type: 'number',
            message: "Which department ID does the role belong to?",
            name: 'depList'
        },
    ]).then(ans => {
        db.query("INSERT INTO role SET ?", {
            title: ans.rolTitle,
            salary: ans.roleSalary,
            department_id: ans.depList
        }, function (err,date){
            if(err){
                throw err
            }
        })
        start();
    })
}

function addDep() {
    inquirer.prompt([
        {
            type: 'input',
            message: "What is the name of the department?",
            name: 'depName',
        },
    ]).then(ans => {
        db.query("INSERT INTO department SET ?", {
            name: ans.depName
        }, function (err,data) {
            if(err){
                throw err
            }
        })
        start();
    })
}

// updating
function updateEmpRol() {
     
    db.query('SELECT * FROM employee', function (err, data) {
        console.log('\n------------------------------------------------\n')
        console.table(data);
        console.log('\n------------------------------------------------\n')
    });

    inquirer.prompt([
        {
            type: 'number',
            message: 'what is the employee ID?',
            name: 'empID'
        },
        {
            type: 'number',
            message: "Enter the employee's new role ID",
            name: 'newRolID'
        },

    ])
    .then(ans => {
        db.query("UPDATE employee SET role_id = ? WHERE id = ?", [ans.newRolID, ans.empID], function (err,data) {
            if(err){
                throw err
            }
        })
        start();
    }) 
}

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});  

start();