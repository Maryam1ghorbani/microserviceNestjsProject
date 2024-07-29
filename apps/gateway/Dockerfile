FROM node:20.11.0-bookworm-slim

EXPOSE 3000

WORKDIR /app
COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

ENV NODE_ENV=PROD
RUN npm run build
ENTRYPOINT [ "npm", "run", "start:prod" ] 


