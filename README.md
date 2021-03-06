# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
For install postgresaa
 package you can follow this steps:
https://medium.com/@dan.chiniara/installing-postgresql-for-windows-7ec8145698e3
then use command 
npm install pg > will add the pg in dependencies
npm i --save-dev@types/pg > will add dev dependencies

- Node/Express for the application logic
npm init -y > will create package.json file
npm install typescript --save-dev > will install the typescript
tsc --init > will create the tsconfig.json file
npm install express > will install express
npm install --save-dev @types/express > install the express types

- dotenv from npm for managing environment variables
npm install dotenv
npm install --save-dev @types/dotenv > install the dotenv types

- db-migrate from npm for migrations
npm install -g db-migrate > will install db-migrate globaly
yarn add db-migrate db-migrate-pg > will install db-migrate package to the project

- jsonwebtoken from npm for working with JWTs
- jasmine and supertest from npm for testing

## Steps to Completion

### 1. Plan to Meet Requirements

In this repo there is a `REQUIREMENTS.md` document which outlines what this API needs to supply for the frontend, as well as the agreed upon data shapes to be passed between front and backend. This is much like a document you might come across in real life when building or extending an API. 

Your first task is to read the requirements and update the document with the following:
- Determine the RESTful route for each endpoint listed. Add the RESTful route and HTTP verb to the document so that the frontend developer can begin to build their fetch requests.    
**Example**: A SHOW route: 'blogs/:id' [GET] 

- Design the Postgres database tables based off the data shape requirements. Add to the requirements document the database tables and columns being sure to mark foreign keys.   
**Example**: You can format this however you like but these types of information should be provided
Table: Books (id:varchar, title:varchar, author:varchar, published_year:varchar, publisher_id:string[foreign key to publishers table], pages:number)

**NOTE** It is important to remember that there might not be a one to one ratio between data shapes and database tables. Data shapes only outline the structure of objects being passed between frontend and API, the database may need multiple tables to store a single shape. 

### 2.  DB Creation and Migrations

Now that you have the structure of the databse outlined, it is time to create the database and migrations. Add the npm packages dotenv and db-migrate that we used in the course and setup your Postgres database. If you get stuck, you can always revisit the database lesson for a reminder. 

You must also ensure that any sensitive information is hashed with bcrypt. If any passwords are found in plain text in your application it will not pass.

### 3. Models

Create the models for each database table. The methods in each model should map to the endpoints in `REQUIREMENTS.md`. Remember that these models should all have test suites and mocks.

### 4. Express Handlers

Set up the Express handlers to route incoming requests to the correct model method. Make sure that the endpoints you create match up with the enpoints listed in `REQUIREMENTS.md`. Endpoints must have tests and be CORS enabled.
#### The EndPoints
##### Users Endpoints:
    app.post('/users', create); Create User Post method(http://localhost:3000/users)
    app.get('/users', index); Show all users Get method(http://localhost:3000/users)
    app.get('/users/:id', show); Show user by Id Get method(localhost:3000/users/id)
    app.put('/users/:id', edit); Update user by Id Put method(http://localhost:3000/users/id) 
    app.delete('/users/:id', remove); Delete user by Id Delete method(http://localhost:3000/users/id)

##### Orders Endpoints:
    app.post('/orders', create); Create order Post method(http://localhost:3000/orders)
    app.get('/orders', index); Show all orders Get method(http://localhost:3000/orders)
    app.get('/orders/:id', show); Show order by Id Get method(localhost:3000/orders/id)
    app.put('/orders/:id', edit); Update order by Id Put method(http://localhost:3000/orders/id) 
    app.delete('/orders/:id', remove); Delete oder by Id Delete method(http://localhost:3000/orders/id)
    app.post('/orders/:id/books', create_o_d); Create order details post method(http://localhost:3000/orders/3/books)

### 5. JWTs

Add JWT functionality as shown in the course. Make sure that JWTs are required for the routes listed in `REQUIUREMENTS.md`.

### 6. QA and `README.md`

Before submitting, make sure that your project is complete with a `README.md`. Your `README.md` must include instructions for setting up and running your project including how you setup, run, and connect to your database. 

Before submitting your project, spin it up and test each endpoint. If each one responds with data that matches the data shapes from the `REQUIREMENTS.md`, it is ready for submission!
###### Env variables
PORT=3000
NODE_ENV=dev
 
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=books_store
POSTGRES_DB_TEST=books_store_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=P@SQL22
BCRYPT_PASSWORD=book-stor-crypte
SALT_ROUNDS=12
JSON_SECRET_TOKEN=book-stor-token
