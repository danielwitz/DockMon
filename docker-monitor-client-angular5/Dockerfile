FROM node:alpine as builder
WORKDIR /usr/src/app
COPY . .
RUN yarn && yarn build && cp -R dist server/frontend

FROM node:alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/server .
RUN yarn
CMD ["node", "index"]
