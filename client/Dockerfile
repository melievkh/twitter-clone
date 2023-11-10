FROM node:20

WORKDIR /app/client

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
