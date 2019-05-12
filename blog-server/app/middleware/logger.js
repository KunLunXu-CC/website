const _ = require('lodash');
const moment = require('moment');
const colors = require('colors');
const start = colors.red(`[*${moment().format('YYYY-MM-DDD:HH:mm:ss')}*]`);

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
  const body = ctx.request.body;
  let queryDoc = body.query || '';
  body.query && delete body.query;
  const params = JSON.stringify({
    method: ctx.request.method,
    url: ctx.request.url,
    ...(body || {}),
  }, null, 4);

  console.log(start, colors.cyan('请求参数：'), colors.yellow(params));
  console.log(start, colors.cyan('请求文档：'), colors.yellow(queryDoc));
}

/**
 * 打印响应参数
 * @param {Object} ctx 上下文
 */

printResponseData = (ctx) => {
  let body = {};
  try {
    body = _.isString(ctx.body) ? JSON.parse(ctx.body) : ctx.body;
  } catch (e){}
  const params = JSON.stringify({
    status: ctx.status,
    body,
  }, null, 4);

  console.log(start, colors.cyan('响应数据：'), colors.yellow(params));
}

module.exports = async (ctx, next) => {

  await next();
  printStart();
  printRequestData(ctx);
  printResponseData(ctx);
}
