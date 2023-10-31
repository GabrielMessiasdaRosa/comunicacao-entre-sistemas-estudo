FROM node:slim

RUN apt update && \
    apt install -y wget netcat-traditional && \
    wget -q -O /usr/bin/wait-for https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for && \
    chmod +x /usr/bin/wait-for

RUN apt-get update && apt-get install procps -y

RUN npm i -g @nestjs/cli

WORKDIR /usr/src/app/

COPY . .

RUN npm install

ENTRYPOINT wait-for pgsql:5432 -t 25 -- npm install && npm run start:dev