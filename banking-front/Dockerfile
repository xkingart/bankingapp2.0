FROM node:16

# Customized name (can be anything)
WORKDIR /xking-banking-front

COPY package.json package-lock.json ./
COPY ./src ./src 

RUN npm install

EXPOSE 3000

CMD npm start