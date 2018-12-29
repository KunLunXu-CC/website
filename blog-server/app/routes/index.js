const Router = require('koa-router');
const router = new Router();
const mongoose = require('mongoose');

router.get('/', (ctx, next) => {
  mongoose.connect('mongodb://localhost/blog', {useNewUrlParser: true});
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;
  
  const BlogPost = new Schema({
    title: String,
    body: String,
    date: Date
  });
  const MyModel = mongoose.model('modelName', BlogPost);
  MyModel.insertMany({});
  ctx.body = '1111111111111';
});

module.exports = (app) => {
  app.use(router.routes()).use(router.allowedMethods());
}
