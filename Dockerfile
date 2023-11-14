FROM node:18-alpine

RUN npm install -g @quasar/cli

WORKDIR /app

COPY . .