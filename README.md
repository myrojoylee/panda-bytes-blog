# Panda Bytes - A Tech Blog!

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

This application is a mock-style Content Management System (CMS). It implements full CRUD functionality by being able to create, read, update, and delete posts. A user is able to sign up for an account or log in to an existing one. Posts can be written or commented on depending on login status and all posts are visible on the homepage. Finally, the completed app is deployed on Heroku for use.

## Installation

- MySQL is required for this app to run, so follow directions outlined [here](https://coding-boot-camp.github.io/full-stack/mysql/mysql-installation-guide) for a step-by-step guide depending on your operating system.
- This is a [Node.js](https://nodejs.org/en) application. It is recommended to use at least v16 (up to v18) for this app to run correctly.

### Dependencies

Type the following in your terminal to run the application:

`npm i express`

- [Bcrypt](https://www.npmjs.com/package/bcrypt) is a bcrypt NodeJSlibrary needed for password hashing.

- [Express](https://expressjs.com/) is web framework for NodeJS.

`npm i express-session`

- [Express-session](https://www.npmjs.com/package/express-session) is the session middleware for Express.

`npm i express-handlebars`

- [Express-handlebars](https://www.npmjs.com/package/express-handlebars) is the templating engine utilized in the app.

`npm i sequelize`

- [Sequelize](https://sequelize.org/) is the ORM tool used in this work.

`npm i connect-session-sequelize`

- [Connect Session Store using Sequelize](https://www.npmjs.com/package/connect-session-sequelize) connects the session with Sequelize.

`npm i mysql2`

- [MySQL2](https://www.npmjs.com/package/mysql2) is needed to connect the app to the MySQL database.

`npm i dotenv`

- [dotenv](https://www.npmjs.com/package/dotenv) is needed to handle environmental variables that hold sensitive data.

### Optional, but recommended:

- [Nodemon](https://nodemon.io/) to enable automatic restarting of your server upon any detected changes. In your terminal, replace `node server` with `nodemon server`.

## Usage

A user can sign up, log in, submit/edit/delete their posts, or comment on other posts. Simply click on the [website](https://panda-bytes-blog-2c69ca0b6d05.herokuapp.com/) to try it out. A demo gif is shown below:

<img src="https://github.com/myrojoylee/panda-bytes-blog/blob/main/public/css/assets/blog-preview.png" width = "700" />

## Contribution Guidelines

N/A

## Credits/Acknowledgments

## License

Refer to the license in the respository.
