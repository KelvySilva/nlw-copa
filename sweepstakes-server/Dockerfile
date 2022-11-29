
FROM node:lts-slim as builder

LABEL version="3.0.0"
LABEL maintainer="Kelvy Silva"

RUN apt-get update && apt-get upgrade -y && apt-get autoclean -y && apt-get autoremove -y

RUN groupadd -r src && useradd -g src -s /bin/bash -d /usr/src -m src
USER nodejs

RUN mkdir -p /usr/src/app/node_modules && chown -R src:src /usr/src/app


WORKDIR /usr/src/app

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
ENV NPM_CONFIG_LOGLEVEL=warn
COPY --chown=src:src package*.json ./
COPY --chown=src:src tsconfig.json ./
COPY .snyk ./
RUN npm install && npm audit fix && npm cache clean --force
COPY --chown=src:src . .
EXPOSE 3333
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s CMD npm run healthcheck-manual
CMD ["npm","run","dev"]