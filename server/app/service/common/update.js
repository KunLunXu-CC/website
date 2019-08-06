const { RESCODE } = require('../../../config/conts');
const getConditions = require('../../../utils/getConditions');
const getList = require('./getList');
/**
 * 通用修改方法
 * @param {String}  model   模型名称
 * @param {Object}  ctx     koa上下文
 * @param {Object}  conds   要更新数据的查询条件
 * @param {Object}  body    创建信息
 * @param {Object}  params  查询参数
 * @param {Object}  page    分页信息
 * @param {Object}  orderBy 排序
 */
module.exports = async ({ model, ctx, conds, body, orderBy, params, page }) => {
  const data = { rescode: RESCODE.SUCCESS, message: '修改成功', list: [], page: {}, stats: {}, change: []};
  const server = ctx.db.mongo[model];
  const changeConds = getConditions(conds);
  let changeIds = [];
  try {
    body.updateTime = Date.now();
    body.updater = null;
    changeIds = (await server.find(changeConds)).map(v => v._id);
    await server.updateMany(changeConds, body, {});
  } catch (e) {
    data.message = RESCODE.FAIL;
    data.message = '修改失败';
  }
  if (params){
    const listData = await getList({ model, ctx, params, page, orderBy });
    data.stats = listData.stats || {};
    data.list = listData.list || [];
    data.page = listData.page || {};
  }
  data.change = await server.find({_id: {$in: changeIds}});
  return data;
}
