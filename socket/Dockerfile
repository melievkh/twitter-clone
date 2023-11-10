FROM node:16

WORKDIR /socket

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
