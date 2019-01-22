const colors = require('colors');

const getRequestInfo = (request) => {
  if (!request){return '空空如也'}
  if (request.body){
    return request.body.query || request.body;
  }
}

module.exports = async (ctx, next) => {
  await next();
  console.log(`--> base: \n ${ctx.request.method} ${ctx.request.url}`.cyan);
  console.log(`--> info：\n ${getRequestInfo(ctx.request)}`.cyan);

  // console.log('res >>>', JSON.parse(ctx.response.body));
  // console.log('res.state >>>', ctx.response.status);

  // console.log('hello'.green);
  // console.log('i like cake and pies'.underline.red) 
}
