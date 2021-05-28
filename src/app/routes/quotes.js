const Router = require('@koa/router');

const router = new Router({ prefix: '/quotes' });

router
  .get('/', async ctx => {})
  .get('/random', async ctx => {})
  .post('/', async ctx => {})
  .get('/:id', async ctx => {})
  .delete('/:id', async ctx => {});

module.exports = router;
