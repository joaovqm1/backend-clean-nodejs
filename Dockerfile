FROM node:12.13.1-alpine

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 5000

CMD ["yarn", "production"]
