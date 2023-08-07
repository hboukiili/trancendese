FROM node:20

WORKDIR /usr/src/app/

COPY ./*.json ./

RUN npm install

COPY ./src ./src

COPY vite.config.ts .

COPY ./index.html ./

EXPOSE 80

CMD [ "npm", "run", "dev"]