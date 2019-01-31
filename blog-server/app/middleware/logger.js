const _ = require('lodash');
const colors = require('colors');
const start = colors.red("[*]");

/**
 * 打印字符图案
 */
const printStart = () => {
  const charPattern = [
    "              _       _     _                             ",
    "   _ __  _ __(_)_ __ | |_  | | ___   __ _  __ _  ___ _ __ ",
    "  | '_ \\| '__| | '_ \\| __| | |/ _ \\ / _` |/ _` |/ _ \\ '__|",
    "  | |_) | |  | | | | | |_  | | (_) | (_| | (_| |  __/ |   ",
    "  | .__/|_|  |_|_| |_|\\__| |_|\\___/ \\__, |\\__, |\\___|_|   ",
    "  |_|                               |___/ |___/           ", "",
    "  ----------------------- 日志打印 ------------------------"
  ];
  console.log(`\n${charPattern.join('\n').cyan}\n`);
} 

/**
 * 打印请求参数
 * @param {Object} ctx 上下文
 */
const printRequestData = (ctx) => {
  const params = JSON.stringify({
    method: ctx.request.method,
    url: ctx.request.url
  }, null, 4);

  const body = ctx.request.body;
  let queryData = '';
  try {
    body && (queryData = JSON.stringify(body, null, 4).replace(/\\n/g, '\r\n'));
  } catch (e){}
  
  console.log(start, colors.cyan('请求参数：'), colors.yellow(params));
  console.log(start, colors.cyan('请求数据：'), colors.yellow(queryData));
}

/**
 * 打印响应参数
 * @param {Object} ctx 上下文
 */

 printResponseData = (ctx) => {
  const params = JSON.stringify({
    status: ctx.status,
  }, null, 4);
  let body = '';
  try {
    body = _.isString(ctx.body) 
      ? JSON.stringify(JSON.parse(ctx.body), null, 4) 
      : JSON.stringify(ctx.body, null, 4);
  } catch (e){}

  console.log(start, colors.cyan('响应参数：'), colors.yellow(params));
  console.log(start, colors.cyan('响应数据：'), colors.yellow(body));
}


module.exports = async (ctx, next) => {

  await next();
  printStart();
  printRequestData(ctx);
  printResponseData(ctx);
}
