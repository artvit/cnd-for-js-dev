const config = require('./config');

const http = require('http');
const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const { createTerminus } = require('@godaddy/terminus');

const quotesRouter = require('./app/routes/quotes');

const app = new Koa();
const router = new Router();
const apiRouter = new Router();

apiRouter.use(quotesRouter.routes());

router
  .use('/api', apiRouter.routes())
  .get('/ping', async ctx => {
    ctx.body = {
      statusCode: 200,
      message: 'OK',
      time: new Date()
    };
  });

app
  .use(serve('static'))
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

const server = http.createServer(app.callback());
createTerminus(server, {
  onShutdown: () => console.log('Server shut down')
});
server.listen(config.PORT, err => err ? console.error(err) : console.log('Server started'));
