create database authDB;
use authDB;

create table login(
    username varchar(50) not null,
    password varchar(50) not null,
    primary key(username, password)
);

INSERT INTO login (username, password) VALUES
('user1', 'password123'),
('user2', 'mypassword456'),
('admin', 'adminpass789'),
('guest', 'guestpass012'),
('developer', 'devpassword345');
