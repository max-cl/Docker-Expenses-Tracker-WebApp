# Docker - Expenses Tracker WebApp

### Login
<img width="480" alt="login" src="https://user-images.githubusercontent.com/39265526/169651709-c81ce6c8-a5f8-49b2-a852-c0d17b655a08.png">

### Dashboard
<img width="560" alt="dashboard" src="https://user-images.githubusercontent.com/39265526/169651767-fee3e2a0-1ccb-4e03-be8d-c530ba90fe86.png">

## Description

### You will find 5 sections:

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

### Database

    - Mysql

## Useful Docker commands

    - docker-compose up --build (build the images and run the services)
    - docker-compose up (run services)
    - docker-compose up -d (run services in background)
    - docker ps (list the containers are running)
    - docker image ls (list images)
    - docker logs ID_CONTAINER (see logs of a container)
    - docker start/stop ID_CONTAINER (start/stop a container)
    - docker exec -it ID_CONTAINER mysql -uYOUR_USERNAME -pYOUR_PASSWORD (connect to the mysql container)

## Run WebApp

    - git clone https://github.com/max-cl/Docker-Expenses-Tracker-WebApp.git
    - docker-compose up --build
    - docker ps
    - docker exec -it ID_CONTAINER mysql -uYOUR_USERNAME -pYOUR_PASSWORD test
    - INSERT Roles (you can find the query in "FAKE_DATA_FILL_TABLES.sql" file)
    - INSERT Expense Categories (you can find the query in "FAKE_DATA_FILL_TABLES.sql" file)
    - Open browser and go to "localhost:3000"
    - Register an user (press SignUp button)
    - Login
    - Add Budget (Profile Section)
    - Add Expense (Expense Section)
