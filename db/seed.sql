DROP DATABASE IF EXISTS accountantDB;
CREATE DATABASE accountantDB;
USE accountantDB;

CREATE TABLE department(
    id int auto_increment not null,
    name varchar(30),

    PRIMARY KEY (id)
);

CREATE TABLE role(
    id int auto_increment not null,
    title varchar(30) not null,
    salary decimal not null,
    department_id int null,

    PRIMARY KEY (id)
);

CREATE TABLE employee(
    id int auto_increment not null,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id int not null,
    manager_id int null,

    PRIMARY KEY (id)
);


INSERT INTO department (name)
VALUES ("Adminstration"), ("Management"), ("HR"), ("Engineers"), ("Marketing"), ("Interns");

INSERT INTO role (title, salary, department_id)
VALUES ("CEO", 10000000, 1), ("PBR Chief", 3000000, 1), ("Work Relation Chief", 5000000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("HR Manager", 130000, 2), ("Engineer Manager", 250000, 2), ("Marketing Manager", 200000, 2), ("Intern Manager", 110000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Complaints HR rep", 75000, 3), ("Laws and Guidelines HR rep", 80000, 3), ("Relaxtion HR rep", 55000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Head Engineer", 120000, 4);

INSERT INTO role (title, salary, department_id)
VALUES ("Lead Marketing Chief", 100000, 5);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Jason", "Ozulumba", 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Chris", "Harvey", 5, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jeremy", "Ozulumba", 11, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Lily", "Ozulumba", 6, 1);