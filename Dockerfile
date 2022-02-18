FROM node:16-alpine as build

WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .
COPY packages/engine ./packages/engine
COPY packages/server ./packages/server
COPY packages/web ./packages/web

RUN yarn install --pure-lockfile --non-interactive

WORKDIR /app/packages/server
RUN yarn build

WORKDIR /app/packages/engine
RUN yarn build

WORKDIR /app/packages/web
RUN yarn build

FROM node:16-alpine

WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .

COPY --from=build /app/packages/server/dist packages/server
COPY --from=build /app/packages/server/package.json packages/server

COPY --from=build /app/packages/engine/dist packages/engine
COPY --from=build /app/packages/engine/package.json packages/engine

COPY --from=build /app/packages/web/build packages/server/public

ENV NODE_ENV production

RUN yarn install --pure-lockfile --non-interactive --production

EXPOSE 8000

WORKDIR /app/packages/server

ENTRYPOINT ["node", "index.js"]
