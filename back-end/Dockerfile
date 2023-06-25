FROM node:20

WORKDIR /usr/src/app/

COPY ./*.json ./


RUN npm install

COPY ./src ./src

COPY ./prisma ./prisma

COPY ./.env ./

EXPOSE 3000

RUN npm i @nestjs/swagger

CMD npx prisma generate && npm run start:dev