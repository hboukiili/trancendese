FROM node:20

WORKDIR /usr/src/app/

COPY ./*.json ./


RUN npm install


COPY ./src ./src

COPY ./prisma ./prisma

COPY uploads .

COPY ./.env ./

RUN npm i @nestjs/swagger

RUN apt-get update && apt-get install coreutils

RUN apt-get install xdg-utils -y

EXPOSE 3000

EXPOSE 5555

CMD npx prisma generate && npm run start:dev