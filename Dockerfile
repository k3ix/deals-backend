FROM node:16.18-alpine as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:16.18-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./

COPY --from=development /usr/src/app/node_modules ./node_modules

COPY . .

RUN npm run build

RUN npm ci --omit-dev && npm cache clean --force

FROM node:16.18-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit-dev

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
RUN npm i global cross-env

CMD [ "cross-env", "NODE_ENV=${NODE_ENV}", "node", "/app/dist/src/main" ]