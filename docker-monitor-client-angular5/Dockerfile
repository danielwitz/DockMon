FROM node:alpine
WORKDIR /usr/src/app
COPY . .
RUN yarn && yarn build && cd server && yarn && cp -R ../dist frontend
WORKDIR /usr/src/app/server
CMD [ "node", "index" ]
