# cnd-for-js-dev
Cloud and DevOps for JS developers

## Available Scripts
In the project directory, you can run:

### Run full application in docker
`docker-compose` is used to run UI and API containers.
Application is available on default ports (80 and 443).
#### `docker-compose up`
Runs the app parts of application in foreground
#### `docker-compose up -d`
Runs the app parts of application in background
#### `docker-compose down`
Stops all the containers

### Run server with node
Start API using local NodeJS.
#### `npm start`
Runs the application
#### `npm run start:watch`
Runs the application in watch mode (the application restarts after changes in source code).
#### `npm run lint`
Runs linter on source code
