# Base image
FROM node:18.13 as build

RUN mkdir /app
WORKDIR /app

COPY . .

RUN npm install -g @angular/cli
RUN npm install

EXPOSE 4200