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
ARG PORT=7000
ARG MONGO_URI=mongodb+srv://yahorr:q23456@deals-db.o0b36xm.mongodb.net/?retryWrites=true&w=majority
ARG JWT_SECRET=dealssecret
ENV NODE_ENV ${NODE_ENV}
ENV PORT ${PORT}
ENV MONGO_URI ${MONGO_URI}
ENV JWT_SECRET ${JWT_SECRET}

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit-dev

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
RUN npm install -g cross-env

CMD [ "cross-env", "PORT=${PORT}", "MONGO_URI=${MONGO_URI}", "NODE_ENV=${NODE_ENV}", "JWT_SECRET=${JWT_SECRET}", "node", "/app/dist/src/main" ]