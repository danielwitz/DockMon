FROM node:alpine
WORKDIR /usr/src/app
COPY . .
RUN yarn && yarn build
EXPOSE 8080
CMD [ "yarn", "start" ]