FROM node:12

## WORKDIR specifies the directory our
## application's code will live within
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

## We copy our package.json file to our
## app directory
COPY package*.json /usr/src/app/

## We then run npm install to install
## express for our application
RUN npm install

## We then copy the rest of our application
## to the app direcoty
COPY . /usr/src/app/

EXPOSE 3000

## We start our application by calling
## npm start.
CMD ["npm","start"]

# Boundle app source
VOLUME /usr/src/app
VOLUME /usr/src/app/node_modules