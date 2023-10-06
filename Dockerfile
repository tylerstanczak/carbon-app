FROM node:18-alpine
COPY . .
RUN npm install
RUN npm run build
EXPOSE 9080/tcp
CMD node server/index.js