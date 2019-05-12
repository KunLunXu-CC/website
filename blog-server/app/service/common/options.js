const { STATUS } = require('../../../config/conts');

/**
 * 通用获取下拉项 options 方法
 * @param {Object} ctx              koa 上下文
 * @param {String} model            模型名称
 * @param {Object} page             查询页数
 * @param {Object} params           查询参数
 * @param {Object} params.include   查询参数:必须包含项（id数组）
 * @param {Object} params.name      查询参数(通过 name 进行模糊匹配)
 * @param {Object} params.filter    查询参数：过滤项（id 数组）
 */
module.exports = async ({ ctx, model, page = {}, params = {} }) => {
  const defautPageSize = 10;
  const server = ctx.db.mongo[model];
  const { include = [], name = '', filter = [] } = params;

  // 查询参数处理
  const limit = (page.page || 1) * (page.pageSize || defautPageSize) - include.length;
  const conds = { 
    name: { $regex: name },
    status: {$ne: STATUS.DELETE},
  };

  // 统计数据
  const total = await server.find(conds).count();
  const stats = { total, totalPage: Math.ceil(total / (page.pageSize || defautPageSize)) }; 

  // 查询( 基础数据、必要数据 )
  const baseList = await server.find({ ...conds, _id: { $nin: [...include, ...filter] }}).limit(limit);
  const requiredList = await server.find({ _id: { $in: include }});

  return { list: [...baseList, ...requiredList ], stats, page };
}
