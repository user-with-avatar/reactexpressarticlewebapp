--https://onecompiler.com/mysql
create database thething;

create table articles (
    id int auto_increment primary key,
    title varchar(256),
    text longtext,
    author int
);
create table users (
    id int auto_increment primary key,
    name varchar(128),
    password varchar(128),
    avatar blob(65535)
);
create table comments (
    id int auto_increment primary key,
    text varchar(256),
    article int not null,
    user int not null,
    parent int
);