FROM node:14

WORKDIR /app/server

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
