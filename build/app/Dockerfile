FROM node:20
WORKDIR /app

COPY ./source/package*.json ./
RUN npm install

COPY ./source .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
