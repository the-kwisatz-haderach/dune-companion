FROM node:16-alpine as build-stage

WORKDIR /app

COPY lerna.json .
COPY package.json .
COPY .yarn ./.yarn
COPY .yarnrc.yml .
COPY yarn.lock .
COPY tsconfig.json .
COPY packages/engine ./packages/engine
COPY packages/server ./packages/server
COPY packages/web ./packages/web

RUN yarn install --frozen-lockfile
RUN yarn dist

FROM node:16-alpine

WORKDIR /app

COPY --from=build-stage /app/node_modules ./node_modules
COPY --from=build-stage /app/packages/engine/dist packages/engine
COPY --from=build-stage /app/packages/server/dist packages/server
COPY --from=build-stage /app/packages/web/build packages/server/public

ENV NODE_ENV production

EXPOSE 8000

WORKDIR /app/packages/server

ENTRYPOINT ["node", "index.js"]

