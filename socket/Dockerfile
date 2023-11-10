FROM node:16 

WORKDIR /socket

COPY package*.json ./

RUN npm install

ENV PATH /socket/node_modules/.bin:$PATH

COPY . .

CMD ["npm", "start"]
