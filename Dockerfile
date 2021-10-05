FROM node:16-alpine as build

WORKDIR /app

COPY package.json .
COPY tsconfig.json .
COPY yarn.lock .

COPY packages/engine ./packages/engine
COPY packages/server ./packages/server
COPY packages/web ./packages/web

RUN yarn install --pure-lockfile --non-interactive

WORKDIR /app/packages/engine
RUN yarn build

WORKDIR /app/packages/server
RUN yarn build

WORKDIR /app/packages/web
RUN yarn build

FROM node:16-alpine

WORKDIR /app

COPY package.json .
COPY tsconfig.json .
COPY yarn.lock .

COPY --from=build /app/packages/engine/package.json /app/packages/engine/package.json
COPY --from=build /app/packages/engine/dist /app/packages/engine/dist

COPY --from=build /app/packages/server/package.json /app/packages/server/package.json
COPY --from=build /app/packages/server/dist /app/packages/server/dist

COPY --from=build /app/packages/web/package.json /app/packages/web/package.json
COPY --from=build /app/packages/web/build /app/packages/web/build

ENV NODE_ENV production

RUN yarn install --pure-lockfile --non-interactive --production

WORKDIR /app/packages/server

CMD ["npm", "start"]
