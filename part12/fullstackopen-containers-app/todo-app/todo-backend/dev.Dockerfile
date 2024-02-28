FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm ci --omit=dev

EXPOSE 3000

CMD npm start