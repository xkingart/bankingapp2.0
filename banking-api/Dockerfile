FROM node:16

# Customized name (can be anything)
WORKDIR /xking-banking-api

COPY index.js package.json package-lock.json ./
COPY ./src ./src 

RUN npm install
RUN npm install -g nodemon

ENTRYPOINT [ "nodemon", "--legacy-watch", "--inspect=0.0.0.0", "index.js", "views/**"]

EXPOSE 3001

CMD node index.js