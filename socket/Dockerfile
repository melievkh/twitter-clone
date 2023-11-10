FROM node:20

WORKDIR /app/socket

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
