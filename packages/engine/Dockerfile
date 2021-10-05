FROM node:16-alpine

WORKDIR /app/engine

COPY ./package.json ./
COPY ./tsconfig.json ./
COPY ./src ./

RUN yarn install && yarn global add typescript
RUN yarn run build