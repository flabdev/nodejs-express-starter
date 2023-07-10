# NodeJs application template (ExpressJs)

## Purpose

The purpose of this template is to speed up the creation of new NodeJs applications within Fission Labs and help keep the same standards across multiple teams. If you need to create a new app, you can simply use this one as a starting point and build on top of it.

## What's inside

The template is a working application with a minimal setup. It contains:

    application skeleton

    common plugins and libraries

    docker setup

    code quality tools already set up

    testing libraries

## Prerequisite

The following prerequisites are required for the template to function properly:

- NodeJs 14 or above
- Docker
- Any IDE. (VsCode).

## Setup

Clone the project to specified folder and import it into Your Favourite IDE

    git clone https://github.com/flabdev/nodejs-express-starter.git

## Building and running the application

### Setting Up Local Properties File

Create `.env` file in the root folder and the following

```
PORT= 3000
MONGODB_URI= mongodb_local_connection_string
DB_NAME= DB_NAME
NODE_ENV= developement || production

```

Run the following commands in terminal:

```
# install the dependencies
npm install

# run the server
npm start
```

To run in local development with the `nodemon`

```
npm run dev
```

App Will be run on port 3000

Open the Postman and verify

### Linting configuration

This Project uses ES-Lint

ES-Lint is a Javascript tool used for linting common errors and anti-patterns in your code. It is used by javascript devs all around the world.

```
# check errors/warnings
npm run lint-check


# To fix the above errors/warnings
npm run lint
```

#### SonarQube configuration

- SonarQube is a Code Quality Assurance tool that collects and analyzes source code, and provides reports for the code quality of your project.
- SonarJS rules are added in the ESLint to detect bugs and suspicious patterns in code .

## Dockerizing NodeJs-MongoDB project

change `.env` file in the root folder

```
MONGODB_URI= mongodb://mongo_db:27017

<!-- MONGODB_URI is from the docker -->
```

First, build the container images and create the services by running docker-compose up with the -d flag, which will then run the application and database containers in the background:

```
docker-compose up -d

```

To check the status of your containers:

```
docker-compose ps
```

Get more detailed information about the startup processes by displaying the log output from the services:

```
docker-compose logs [service]

Eg: docker-compose logs api

```

With your services running, visit `http://localhost:{port}`.

To stop or remove your containers:

```
docker-compose down

```

Note that you are not including the --volumes option; hence, your dbdata volume is not removed.

## Testing the ExpressJs Applicaiton

This quick starter will guide you to configure in a NodeJs project.

Make sure you have NodeJs 14+ and a compatible Docker environment installed.

The sample project uses Mocha and chai to run them against actual databases running.

### Install the dependencies

```
npm install mocha supertest chai
```

Run the command to run the tests.

```
npm run test
```

The tests should pass.

With the Docker compose :

```
docker compose up
```

it will run test cases , see the logs in

```
docker compose logs [service]

Eg: docker compose tests
```
