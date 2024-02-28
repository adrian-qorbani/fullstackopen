FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm install

# npm start is the command to start the application in development mode
CMD ["npm", "start"]