const { STATUS, RESCODE } = require('../config/conts');
const getConditions = require('../utils/getConditions');
const _ = require('lodash');

/**
 * 创建文章
 * @param {Object}  ctx     koa上下文
 * @param {Object}  body    创建信息
 * @param {Object}  params  查询参数
 * @param {Object}  page    分页参数
 */
module.exports.create = async ({ ctx, body, params, orderBy, page }) => {
  const data = { rescode: RESCODE.SUCCESS, message: '创建成功', list: [], page: {}, stats: {}, change: []};
  const server = ctx.db.mongo.Tag;
  try {
    data.change = await server.insertMany(body.map(v => ({
      ...v,
      creator: "创建人先写死",
      updater: "更新人先写死(创建时加的)",
    })));
  } catch(e) { 
    data.rescode = RESCODE.FAIL;
    data.message = '创建失败';
  }
  if (params){
    const listData = await this.getList({ ctx, params, orderBy, page });
    data.stats = listData.stats || {};
    data.list = listData.list || [];
    data.page = listData.page || {};
  } 
  return data;
}

/**
 * 删除文章（假删）
 * @param {Object} ctx      koa 上下文
 * @param {Object} conds    要删除数据的查询条件
 * @param {Object} params   查询参数
 * @param {Object} page     分页信息
 */
module.exports.remove = async ({ ctx, conds, params, orderBy, page }) => {
  const data = { rescode: RESCODE.SUCCESS, message: '删除成功', list: [], page: {}, stats: {}, change: []};
  const server = ctx.db.mongo.Tag;
  const changeConds = getConditions(conds);
  try {
    await server.updateMany(changeConds, { status: STATUS.DELETE });
  } catch (e) {
    data.rescode = RESCODE.FAIL;
    data.message = '删除失败';
  }

  if (params){
    const listData = await this.getList({ ctx, params, orderBy, page });
    data.stats = listData.stats || {};
    data.list = listData.list || [];
    data.page = listData.page || {};
  } 
  data.change = await server.find(changeConds);
  return data;
}

/**
 * 修改
 * @param {Object}  ctx     koa上下文
 * @param {Object}  conds   要删除数据的查询条件
 * @param {Object}  body    创建信息
 * @param {Object}  params  查询参数
 * @param {Object}  page    分页信息
 */
module.exports.update = async ({ ctx, conds, body, orderBy, params, page }) => {
  const data = { rescode: RESCODE.SUCCESS, message: '修改成功', list: [], page: {}, stats: {}, change: []};
  const server = ctx.db.mongo.Tag;
  const changeConds = getConditions(conds);
  try {
    body.updateTime = Date.now();
    body.updater = '更新人暂定';
    await server.updateMany(changeConds, body, {});
  } catch (e) {
    data.message = RESCODE.FAIL;
    data.message = '修改失败';
  }
  if (params){
    const listData = await this.getList({ ctx, params, page, orderBy });
    data.stats = listData.stats || {};
    data.list = listData.list || [];
    data.page = listData.page || {};
  }
  data.change = await server.find(changeConds);
  return data;
}

 /**
 * 获取标签列表
 * @param {Object}  ctx      koa上下文
 * @param {Object}  params  查询参数
 * @param {Object}  page    分页参数
 */
module.exports.getList = async ({ ctx, params, page, orderBy }) => {
  const server = ctx.db.mongo.Tag;
  const conds = getConditions(params);
  const data = { 
    list: [], 
    change: [],
    message: '请求成功', 
    page: { ...page }, 
    rescode: RESCODE.SUCCESS, 
    stats: { total: await server.find(conds).count() }, 
  };
  try {
    if (page){
      const sort = orderBy || {};
      const skip = ( page.page - 1 ) * page.pageSize;
      const limit = page.pageSize;
      data.list = await server.find(conds).skip(skip).limit(limit).sort(sort);
      data.stats.totalPage = Math.ceil( data.stats.total / page.pageSize );
    } else {
      data.list = await server.find(conds);
    }
  } catch (e) {
    data.rescode = RESCODE.FAIL;
    data.message = '请求失败';
  }
  return data;
}
