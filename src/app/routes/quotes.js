const Router = require('@koa/router');
const QuotesService = require('../services/quotes');

const quotesService = new QuotesService();
const router = new Router({ prefix: '/quotes' });

router
  .get('/', async ctx => {
    ctx.body = quotesService.getAll();
  })
  .get('/random', async ctx => {
    const tag = ctx.query.tag;
    const quote = tag ? quotesService.getRandomByTag(tag) : quotesService.getRandom();
    quote ? ctx.body = quote : ctx.status = 404;
  })
  .post('/', async ctx => {
    const quoteData = ctx.req.body;
    const quote = quotesService.add(quoteData);
    ctx.status = 201;
    ctx.body = quote;
  })
  .get('/:id', async ctx => {
    const quote = quotesService.getById(+ctx.params.id);
    quote ? ctx.body = quote : ctx.status = 404;
  })
  .delete('/:id', async ctx => {
    const quote = quotesService.remove(+ctx.params.id);
    quote ? ctx.status = 200 : ctx.status = 404;
  });

module.exports = router;
