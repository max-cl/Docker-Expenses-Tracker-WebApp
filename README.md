# Docker - Expenses Tracker WebApp

## Description

### You will find 5 main sections:

    - Login (+ Forgot Password and SignUp)
    - Dashboard
    - Expenses
    - Profile
    - NOT FOUND

## Main Technologies

    - Docker

### Front-end

    - React (Typescript)
    - Redux
    - Material UI

### Back-end

    - NodeJS with Express Framework
    - Typescript
    - JWT + Passport
    - Sequelize ORM
    - Nodemailer (Send emails)
    - Joi
    - Test (Mocha and Chai)

### Database

    - Mysql

## Useful Docker commands

    - docker-compose up (run the services)
    - docker-compose up -d (run the services in the background)
    - docker ps (list the containers are running)
    - docker logs ID_CONTAINER (see the logs of a container)
    - docker start/stop ID_CONTAINER (start/stop a container)
    - docker exec -it ID_CONTAINER mysql -uYOUR_USERNAME -pYOUR_PASSWORD (connect to the mysql container)

## Run WebApp

    - git clone https://github.com/max-cl/Docker-Expenses-Tracker-WebApp.git
    - docker-compose up -d
    - docker ps
    - docker exec -it ID_CONTAINER mysql -uYOUR_USERNAME -pYOUR_PASSWORD test
    - INSERT Roles (you can find the query in "FAKE_DATA_FILL_TABLES.sql" file)
    - INSERT Expense Categories (you can find the query in "FAKE_DATA_FILL_TABLES.sql" file)
    - Open browser and go to "localhost:3000"
    - Register an user (press SignUp button)
    - Login
    - Add Budget (Profile Section)
    - Add Expense (Expense Section)
