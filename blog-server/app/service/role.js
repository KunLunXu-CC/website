const { STATUS, RESCODE } = require('../../config/conts');
const common = require('./common/index');
const _ = require('lodash');

/**
 * 创建角色
 * @param {Object}  ctx       koa上下文
 * @param {Object}  body      创建信息
 * @param {Object}  params    查询参数
 * @param {Object}  orderBy   排序
 * @param {Object}  page      分页参数
 */
module.exports.create = async ({ ctx, body, params, orderBy, page }) => {
  const data = { rescode: RESCODE.SUCCESS, message: '创建成功', list: [], page: {}, stats: {}, change: []};
  return await common.create(data)({ model: 'Role', ctx, body, params, orderBy, page});
}

/**
 * 删除角色（假删）
 * @param {Object} ctx        koa 上下文
 * @param {Object} conds      要删除数据的查询条件
 * @param {Object} params     查询参数
 * @param {Object}  orderBy   排序
 * @param {Object} page       分页信息
 */
module.exports.remove = async ({ ctx, conds, params, orderBy, page }) => {
  const data = { rescode: RESCODE.SUCCESS, message: '删除成功', list: [], page: {}, stats: {}, change: []};
  return await common.remove(data)({ model: 'Role', ctx, conds, params, orderBy, page});
}

/**
 * 修改角色
 * @param {Object}  ctx       koa上下文
 * @param {Object}  conds     要删除数据的查询条件
 * @param {Object}  body      创建信息
 * @param {Object}  params    查询参数
 * @param {Object}  orderBy   排序
 * @param {Object}  page      分页信息
 */
module.exports.update = async ({ ctx, conds, body, orderBy, params, page }) => {
  const data = { rescode: RESCODE.SUCCESS, message: '修改成功', list: [], page: {}, stats: {}, change: []};
  return await common.update(data)({ model: 'Role',  ctx, conds, body, orderBy, params, page});
}

/**
 * 获取角色
 * @param {Object}  ctx       koa上下文
 * @param {Object}  params    查询参数
 * @param {Object}  page      分页参数
 * @param {Object}  orderBy   排序
 */
module.exports.getList = async ({  ctx, params, page, orderBy }) => {
  const data = { list: [], change: [], message: '请求成功', page: {},  rescode: RESCODE.SUCCESS, stats: {}, };
  return await common.getList(data)({ model: 'Role', ctx, params, page, orderBy});
}
