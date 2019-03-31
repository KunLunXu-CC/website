const { STATUS, RESCODE } = require('../../config/conts');
const common = require('./common/index');
const _ = require('lodash');

/**
 * 创建文章
 * @param {Object}  ctx       koa上下文
 * @param {Object}  body      创建信息
 * @param {Object}  params    查询参数
 * @param {Object}  orderBy   排序
 * @param {Object}  page      分页参数
 */
module.exports.create = async ({ ctx, body, params, orderBy, page }) => {
  const data = { rescode: RESCODE.SUCCESS, message: '创建成功', list: [], page: {}, stats: {}, change: []};
  return await common.create(data)({ model: 'Article', ctx, body, params, orderBy, page});
}

/**
 * 删除文章（假删）
 * @param {Object} ctx        koa 上下文
 * @param {Object} conds      要删除数据的查询条件
 * @param {Object} params     查询参数
 * @param {Object}  orderBy   排序
 * @param {Object} page       分页信息
 */
module.exports.remove = async ({ ctx, conds, params, orderBy, page }) => {
  const data = { rescode: RESCODE.SUCCESS, message: '删除成功', list: [], page: {}, stats: {}, change: []};
  return await common.remove(data)({ model: 'Article', ctx, conds, params, orderBy, page});
}

/**
 * 修改文章
 * @param {Object}  ctx       koa上下文
 * @param {Object}  conds     要删除数据的查询条件
 * @param {Object}  body      创建信息
 * @param {Object}  params    查询参数
 * @param {Object}  orderBy   排序
 * @param {Object}  page      分页信息
 */
module.exports.update = async ({ ctx, conds, body, orderBy, params, page }) => {
  const data = { rescode: RESCODE.SUCCESS, message: '修改成功', list: [], page: {}, stats: {}, change: []};
  return await common.update(data)({ model: 'Article',  ctx, conds, body, orderBy, params, page});
}

 /**
 * 获取文章表
 * @param {Object}  ctx       koa上下文
 * @param {Object}  params    查询参数
 * @param {Object}  page      分页参数
 * @param {Object}  orderBy   排序
 */
module.exports.getList = async ({  ctx, params, page, orderBy }) => {
  const data = { list: [], change: [], message: '请求成功', page: {},  rescode: RESCODE.SUCCESS, stats: {}, };
  return await common.getList(data)({ model: 'Article', ctx, params, page, orderBy});
}
