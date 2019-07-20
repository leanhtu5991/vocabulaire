FROM node:10
COPY package*.json ./
ADD . /app
RUN chmod -R 777 /app
RUN npm install
WORKDIR /app
EXPOSE 3000
CMD [ "npm", "start" ]
