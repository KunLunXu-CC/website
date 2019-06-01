const Router = require('koa-router');
const path = require('path');
const router = new Router();

router.get('/', async (ctx, next) => {
  const data = '首页';
  ctx.body = data;
});

module.exports = (app) => {
  app.use(router.routes()).use(router.allowedMethods());
}
