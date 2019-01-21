const Router = require('koa-router');
const mongo = require('./db').getMongoModel();
const path = require('path');
const router = new Router();

router.get('/', async (ctx, next) => {
  const data = await mongo.Tag.find();
  ctx.body = data;
});

module.exports = (app) => {
  app.use(router.routes()).use(router.allowedMethods());
}
