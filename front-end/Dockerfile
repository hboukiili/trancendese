FROM node:20

WORKDIR /usr/src/app/

COPY ./*.json ./

RUN npm ci

RUN npm install

COPY ./src ./src

# COPY ./localData ./

COPY ./index.html ./

EXPOSE 3000


CMD [ "npm", "run", "dev"]