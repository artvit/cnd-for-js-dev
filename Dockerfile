FROM node
COPY . /app
WORKDIR /app
ARG NODE_ENV=production
RUN npm i --ignore-scripts
ENV PORT=8080
EXPOSE $PORT
CMD npm start
