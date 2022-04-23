
--CREATE USERS TABLE
CREATE TABLE users(
    id serial primary key,
    u_name varchar not null,
    email varchar unique,
    u_password varchar(250) not null
);