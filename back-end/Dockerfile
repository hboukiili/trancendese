FROM node:20

WORKDIR /usr/src/app/

COPY ./*.json ./


RUN npm install

COPY ./src ./src

COPY ./prisma ./prisma

COPY ./.env ./

EXPOSE 3000

CMD npx prisma migrate dev && npx prisma generate && npm run start:dev