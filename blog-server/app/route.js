const Router = require('koa-router');
const path = require('path');
const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.body = {};
});

module.exports = (app) => {
  app.use(router.routes()).use(router.allowedMethods());
}
