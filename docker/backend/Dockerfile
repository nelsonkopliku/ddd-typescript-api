FROM node:14.17-alpine

RUN mkdir -p /app && \
     chown -R node:node /app && \
     npm install -g ts-node @nestjs/cli

USER node

WORKDIR /app

COPY --chown=node:node package.json /app
COPY --chown=node:node yarn.lock /app
COPY --chown=node:node tsconfig.json /app

# COPY --chown=node:node ./dist /app/dist

RUN yarn install && yarn build

CMD ["node", "./dist/main.js"]