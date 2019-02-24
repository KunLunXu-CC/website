const { RESCODE } = require('../../config/conts');
const getConditions = require('../../utils/getConditions');

 /**
 * 获取数据
 * @param {Object}  data     响应基础数据
 * @param {String}  model    模型名称
 * @param {Object}  ctx      koa上下文
 * @param {Object}  params  查询参数
 */
module.exports = (data) => async ({ model, ctx, params }) => {
  data = {...data};
  const server = ctx.db.mongo[model];
  const conds = getConditions(params);
  try {
    data.data = await server.findOne(conds);
  } catch (e) {
    data.rescode = RESCODE.FAIL;
    data.message = '请求失败';
  }
  return data;
}
