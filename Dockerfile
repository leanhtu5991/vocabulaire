FROM node:8.9
COPY package*.json ./
ADD . /app
RUN npm install
WORKDIR /app
EXPOSE 3000
CMD [ "npm", "start" ]
