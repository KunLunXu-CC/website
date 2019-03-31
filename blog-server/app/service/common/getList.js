const { RESCODE } = require('../../../config/conts');
const getConditions = require('../../utils/getConditions');
const _ = require('lodash');

 /**
 * 获取数据列表
 * @param {Object}  data     响应基础数据
 * @param {String}  model    模型名称
 * @param {Object}  ctx      koa上下文
 * @param {Object}  params  查询参数
 * @param {Object}  page    分页参数
 */
module.exports = (data) => async ({ model, ctx, params, page, orderBy }) => {
  data = {...data};
  const server = ctx.db.mongo[model];
  const conds = getConditions(params);
  data.page = { ...page };
  data.stats = { total: await server.find(conds).count() };
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
