# Flixpicks

Flixpix is a movies database inspired by IMBD and powered by IMDB's api. 


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

In order to run this application locally for testing purposes, Git, node.js (which comes with npm), and a database system (ie. Postgresql) is required. 


## Installing

```
# Clone this repository
$ git clone https://github.com/achoi1225/flixpicks.git
```
1. Create a database named flxp_app and an owner named flxp with a password
2. Create .env file at the root of this project, add environment variables provided in .env.example to .env file 
3. Initialize your database password to the SECRET_KEY variable in your .env file.

```
# Go into the repository, install backend dependencies at the root
$ pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt

# Migrate database tables and seed data.  Make sure you are at the root of the project (backend).
$ pipenv shell
$ flask db migrate
$ flask db upgrade
$ flask seed all

# Go into react-app directory, install frontend dependencies 
$ npm install

```

### Running Application

```
# Run app from within react-app directory
$ npm start

# Go to root directory and run Flask 

# (Use the command below if you are not already in the pipenv shell (virtual environment))
$ pipenv run flask run 

# (Use the command line below if you are already in the virtual environment)
$ flask run
```
Application should open up in your browser from localhost:3000


## Built With

* React - front-end
* Python (Flask SqlAlchemy, Alembic) - back-end
* Postgresql - database


## Contributing

1. Clone repo: $ git clone https://github.com/achoi1225/flixpicks.git
2. Create a new branch: $ git -b name_of_branch.
2. Make changes 
3. Submit Pull Request with description of changes


## Author
* **Andrew Choi** - https://github.com/achoi1225


## Acknowledgments

* App Academy for teaching the skills and the providing the tools I needed to bring this idea to life. 