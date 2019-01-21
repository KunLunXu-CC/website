const colors = require('colors');
module.exports = async (ctx, next) => {
  await next();
  console.log('[日志打印]');
  console.log('method >>>', ctx.request.method);

  console.log('url >>>', ctx.request.url);

  console.log(ctx.request.body.query);

  // console.log('res >>>', JSON.parse(ctx.response.body));
  console.log('res.state >>>', ctx.response.status);

  console.log('hello'.green);
  console.log('i like cake and pies'.underline.red) 
}
