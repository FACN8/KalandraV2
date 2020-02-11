# KalandraV2

Our platform provides top-notch event scheduling services, we are a B2B company that aim to help you schedule your next event of your own interests

## New Version Updates

## Project

Build a server-rendered full-stack app

### Task

- Build an app using the Express framework.
- Use a PostgreSQL database to store and retrieve your data.
- Use the retrieved data to populate a Handlebars template for _server-side_ rendering to be displayed on the front-end.

### Goals

The primary aim of this project is to get comfortable with setting up an Express server and to discover the awesomeness of Handlebars! Spend time considering how to format your layouts, partials and helper functions.

Previous cohorts have built apps where users can share, for example, blog posts, jokes, photos etc. But the app can be about anything as long as you are covering project's technology tasks and goals.

### What's also important:

- Include tests and set up code coverage.
- We expect to see unit tests of pure functions, and integration tests of your server routes, including tests for errors such as 404.
- You should write tests for your database and use a separate test database and build script.
- Use Heroku or a similar service to host the app and the database.
- Try to include ES6 syntax on the server.

## Project

We started our project by setting up the file structure, later on we started defining minimum viable product, while reading together the requirement and creating issues based on groupthinking. we then started imagining and defining front end side. and later on we made a diagram out of the databses.
https://dbdiagram.io/d/5e3961ff9e76504e0ef102cf

the group split to work on different aspects of the project, Ivan was responsible on making the front end side including mobile first design and structure, and basic functionality in the front end

lina took the server side and she built the server.js and the router.js and the handlers.js defining different functions to be used on the server side to contact the database taking into acount the different queries in the database with rabea and the different fetch requests from the front end with ivan

rabea worked on creating the intial database, building a fictive database as well as schema with the group and worked on creating the documentation for the project, as well as deploying database on othe computers, creating the get data functions

testing

### How to set up & build:
- Clone this repo
- Create a database as follows on your machine: `CREATE DATABASE namesloc;`
- `cd` into it and run `npm i`
- Run this command to build database tables: `npm run build:db`
- Create file `.env` and ask us for the variable `DB_URL` contents
- Run server with `npm start`
- Access the website on localhost:[port]
