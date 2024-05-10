FROM node:20.13.0-alpine AS build
RUN apk add --no-cache dumb-init

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .
RUN npm run build

FROM node:20.13.0-alpine

WORKDIR /app

ENV NODE_ENV production
COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
COPY --chown=node:node  --from=build /app/build ./build
COPY --chown=node:node --from=build /app/node_modules ./node_modules

USER node

CMD ["dumb-init", "node", "build/main.js"]