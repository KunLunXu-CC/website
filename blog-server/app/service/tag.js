const { STATUS, RESCODE } = require('../config/conts');
const common = require('./common/index');
const _ = require('lodash');

/**
 * 标签是否存在依赖, 并返回提示语
 * @param {Object}  ctx   koa 上下文
 * @param {Object}  ids   需要检测的 ids 
 * @return {String}  {空字符： 表示不存在依赖， 非空： 存在依赖时给定的提示语}
 */
const tJudgeIsRely = async ( ctx, ids ) => {
  const modelTag = ctx.db.mongo.Tag;
  if(!!await modelTag.find({ parent: { $in: ids }, status: {$ne: STATUS.DELETE}}).count()){
    return '标签存在子级标签';
  }
  return '';
}

/**
 * 创建标签
 * @param {Object}  ctx       koa上下文
 * @param {Object}  body      创建信息
 * @param {Object}  params    查询参数
 * @param {Object}  orderBy   排序
 * @param {Object}  page      分页参数
 */
module.exports.create = async ({ ctx, body, params, orderBy, page }) => {
  const data = { rescode: RESCODE.SUCCESS, message: '创建成功', list: [], page: {}, stats: {}, change: []};
  return await common.create(data)({ model: 'Tag', ctx, body, params, orderBy, page});
}

/**
 * 删除标签（假删）
 * @param {Object} ctx        koa 上下文
 * @param {Object} conds      要删除数据的查询条件
 * @param {Object} params     查询参数
 * @param {Object}  orderBy   排序
 * @param {Object} page       分页信息
 */
module.exports.remove = async ({ ctx, conds, params, orderBy, page }) => {
  const data = { rescode: RESCODE.SUCCESS, message: '删除成功', list: [], page: {}, stats: {}, change: []};
  return await common.remove(data)({ model: 'Tag', ctx, conds, params, orderBy, page });
}

/**
 * 修改标签
 * @param {Object}  ctx       koa上下文
 * @param {Object}  conds     要删除数据的查询条件
 * @param {Object}  body      创建信息
 * @param {Object}  params    查询参数
 * @param {Object}  orderBy   排序
 * @param {Object}  page      分页信息
 */
module.exports.update = async ({ ctx, conds, body, orderBy, params, page }) => {
  const data = { rescode: RESCODE.SUCCESS, message: '修改成功', list: [], page: {}, stats: {}, change: []};
  return await common.update(data)({ model: 'Tag',  ctx, conds, body, orderBy, params, page});
}

 /**
 * 获取标签列表
 * @param {Object}  ctx       koa上下文
 * @param {Object}  params    查询参数
 * @param {Object}  page      分页参数
 * @param {Object}  orderBy   排序
 */
module.exports.getList = async ({  ctx, params, page, orderBy }) => {
  const data = { list: [], change: [], message: '请求成功', page: {},  rescode: RESCODE.SUCCESS, stats: {}, };
  return await common.getList(data)({ model: 'Tag', ctx, params, page, orderBy});
}

/**
 * 获取标签
 * @param {Object}  ctx       koa上下文
 * @param {Object}  params    查询参数
 */
module.exports.findOne = async ({ ctx, params }) => {
  const data = { data: {}, message: '请求成功', rescode: RESCODE.SUCCESS };
  return await common.findOne(data)({ model: 'Tag', ctx, params });
}
