FROM node
COPY . /app
WORKDIR /app
ENV NODE_ENV=production
RUN npm i --ignore-scripts
ENV PORT=80
EXPOSE $PORT
CMD npm start
