# Naively Simple Node Dockerfile

FROM node:14.17-alpine

ENV PORT 3000

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json /usr/src/app/
RUN yarn install

# Copying source files
COPY . /usr/src/app


EXPOSE 3000

CMD [ "yarn", "dev" ]