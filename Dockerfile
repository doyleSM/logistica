FROM node:22-alpine

RUN apk add --no-cache bash

WORKDIR /app

COPY wait-for-it.sh /app/wait-for-it.sh

RUN chmod +x /app/wait-for-it.sh

COPY package*.json ./

RUN npm install

COPY . .
RUN ls
RUN npm run build

EXPOSE 3000

CMD ["bash", "/app/wait-for-it.sh", "postgres:5432", "--", "/app/wait-for-it.sh", "rabbitmq:5672", "--", "bash", "-c", "npm run migration:run && npm run start:prod"]
