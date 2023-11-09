FROM node:14

WORKDIR /app/socket

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
