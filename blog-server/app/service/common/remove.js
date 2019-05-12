const { STATUS, RESCODE } = require('../../../config/conts');
const getConditions = require('../../utils/getConditions');
const getList = require('./getList');
const _ = require('lodash');

/**
 * 通用删除（假删）方法
 * @param {String}  model   模型名称
 * @param {Object} ctx      koa 上下文
 * @param {Object} conds    要删除数据的查询条件
 * @param {Object} params   查询参数
 * @param {Object} page     分页信息
 * @param {Object} orderBy  排序
 */
module.exports = async ({ model, ctx, conds, params, orderBy, page }) => {
  const data = { rescode: RESCODE.SUCCESS, message: '删除成功', list: [], page: {}, stats: {}, change: []};
  const server = ctx.db.mongo[model];
  const changeConds = getConditions(conds);
  try {
    await server.updateMany(changeConds, { status: STATUS.DELETE });
  } catch (e) {
    data.rescode = RESCODE.FAIL;
    data.message = '删除失败';
  }

  if (params){
    const listData = await getList(data)({ model, ctx, params, orderBy, page });
    data.stats = listData.stats || {};
    data.list = listData.list || [];
    data.page = listData.page || {};
  } 
  data.change = await server.find(changeConds);
  return data;
}
