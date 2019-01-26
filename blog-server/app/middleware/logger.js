const colors = require('colors');

module.exports = async (ctx, next) => {
  await next();
  console.log('---> '.red, `${ctx.request.method} ${ctx.request.url}`.cyan);
  // console.log(`--> info：\n ${getRequestInfo(ctx.request)}`.cyan);

  console.log('<--- '.red, `${ctx.status}: ${ctx.body}`.cyan);
  // console.log('res.state >>>', ctx.response.status);
  // console.log('hello'.green);
  // console.log('i like cake and pies'.underline.red) 
}
