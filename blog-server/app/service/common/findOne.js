const { RESCODE } = require('../../../config/conts');
const getConditions = require('../../utils/getConditions');

/**
 * 通用获取单条数据方法
 * @param {String}  model   模型名称
 * @param {Object}  ctx     koa上下文
 * @param {Object}  params  查询参数
 */
module.exports = async ({ model, ctx, params }) => {
  const data = { rescode: RESCODE.SUCCESS, message: '创建成功', data: {}};
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
