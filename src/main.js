const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');

const config = require('./config');

const app = new Koa();
const router = new Router();
const apiRouter = new Router();

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

app.listen(config.PORT);
