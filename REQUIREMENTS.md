# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products (Books)
- Index route: 'books/' [GET]
- Show By Id '/books/:id' [GET]
- Edit By Id route: '/books/:id' [put]
- Delete By Id route: '/books/:id' [delete]
- Create route: '/books' [Post]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index '/users' [GET] [token required] 
- Show By ID /users/:id' [GET] [token required]
- Edit By Id route: '/users/:id' [put] [token required]
- Delete By Id route: '/users/:id' [delete] [token required]
- Create '/users' [post]

#### Orders
- Index route: 'orders/' [GET]
- Show By Id '/orders/:id' [GET]
- Edit By Id route: '/orders/:id' [put]
- Delete By Id route: '/orders/:id' [delete]
- Create route: '/orders' [Post]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes

#### Product
id
title 
- author_id 
- category_id 
- publisher_id 
- published_year 
- pages 
- price 
- isbn 
- in_stock

#### User
id
u_name
email
password

#### Orders
id
id of each product in the order
quantity of each product in the order
user_id
o_date
o_total

## Data Base Tables
#### Author
- id serial primary key,
- name character varying(100) 

#### categories
- idserial primary key,
- name character varying(100)

#### publishers
- id serial primary key,
- p_name varchar,
- p_address  varchar,
- phone varchar

#### Books
- id serial primary key,
- title varchar(100),
- author_id integer REFERENCES authors (id),
- category_id integer REFERENCES categories (id),
- publisher_id integer REFERENCES publishers (id),
- published_year varchar(4),
- pages integer,
- price integer,
- isbn varchar(14),
- in_stock integer

#### User
- id serial primary key,
- u_name  varchar not null,
- email  varchar unique,
- u_password varchar(250) not null

#### Orders
- id serial primary key,
- o_date date,
- o_total integer,
- user_id integer REFERENCES users (id)

#### Orders_Details
- id serial primary key,
- order_id integer REFERENCES orders (id),
- b_count integer,
- book_id integer REFERENCES books (id)