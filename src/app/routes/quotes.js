const Router = require('@koa/router');
const QuotesService = require('../services/quotes');

const quotesService = new QuotesService();
const router = new Router({ prefix: '/quotes' });

const successBody = (data, statusCode = 200, message = 'OK') => ({
  message,
  statusCode,
  data
});

const notFound = () => ({
  statusCode: 404,
  message: 'Not Found'
});

router
  .get('/', async ctx => {
    ctx.body = successBody(quotesService.getAll());
  })
  .get('/random', async ctx => {
    const tag = ctx.query.tag;
    const quote = tag ? quotesService.getRandomByTag(tag) : quotesService.getRandom();
    if (quote) {
      ctx.body = successBody(quote);
    } else {
      ctx.status = 404;
      ctx.body = notFound();
    }
  })
  .post('/', async ctx => {
    const quoteData = ctx.req.body;
    const quote = quotesService.add(quoteData);
    ctx.status = 201;
    ctx.body = successBody(quote, 201);
  })
  .get('/:id', async ctx => {
    const quote = quotesService.getById(ctx.params.id);
    if (quote) {
      ctx.body = successBody(quote);
    } else {
      ctx.status = 404;
      ctx.body = notFound();
    }
  })
  .delete('/:id', async ctx => {
    const quote = quotesService.remove(ctx.params.id);
    if (quote) {
      ctx.body = successBody(undefined);
    } else {
      ctx.status = 404;
      ctx.body = notFound();
    }
  });

module.exports = router;
