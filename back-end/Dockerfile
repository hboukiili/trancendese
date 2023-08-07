FROM node:20

WORKDIR /usr/src/app/

COPY ./*.json ./

RUN npm install

RUN npm install -g concurrently

EXPOSE 3000

EXPOSE 5555

ENTRYPOINT ["sh", "-c", "trap 'exit' INT TERM; concurrently 'npm run start:dev' 'npx prisma generate' "]