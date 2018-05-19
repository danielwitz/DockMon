FROM node:alpine
WORKDIR /usr/src/app
COPY . .
RUN yarn && yarn build
CMD [ "node", "build/index" ]