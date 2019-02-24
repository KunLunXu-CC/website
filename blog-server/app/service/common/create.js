const { RESCODE } = require('../../config/conts');
const getList = require('./getList');

/**
 * 创建文章
 * @param {Object}  data    响应基础数据
 * @param {String}  model   模型名称
 * @param {Object}  ctx     koa上下文
 * @param {Object}  body    创建信息
 * @param {Object}  params  查询参数
 * @param {Object}  page    分页参数
 */
module.exports = (data) => async ({ model, ctx, body, params, orderBy, page }) => {
  data = {...data};
  const server = ctx.db.mongo[model];
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
    const listData = await getList(data)({ model, ctx, params, orderBy, page });
    data.stats = listData.stats || {};
    data.list = listData.list || [];
    data.page = listData.page || {};
  } 
  return data;
}
