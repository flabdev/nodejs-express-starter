# A starter project for NodeJs-Express-mongoDB.

# Prerequisite

- Nodejs 16 or above (https://nodejs.org/en/).
- Any IDE. (VsCode).

### Run Locally on your machine

- Clone the repo to your local machine.

- Create `.env` file in the root floder.

```
# Add
PORT=port
DATABASE=Database_URL
```

- Run the following commands in terminal:

```
# install the dependencies
npm install

# run the server
npm start
```

if you want to run in development

```
npm run dev
```

#### ES-LINT configuration
This Project uses : *ES-LINT, Prettier*

ESLint is a Javascript tool used for linting common errors and anti-patterns in your code. It is used by javascript devs all around the world.

```
# check errors/warnings
npm run lint-check

# To fix the issues
npm run lint
```


Prettier is an opinionated code formatter.

```
# code formatting
npm run pretty
```

#### SonarQube configuration

- SonarQube configuration added with ES-LINT.
- SonarQube is a Code Quality Assurance tool that collects and analyzes source code, and provides reports for the code quality of   your project.