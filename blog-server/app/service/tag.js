const _ = require('lodash');
const { getTimeConds } = require('../utils/helper');

/**
 * 获取查询条件
 * @param {Object} params 查询参数 
 */
const getConditions = (params = {}) => {
  const conds = {};
  _.forIn(params, (value, key) => {
    let startTime = '';
    let endTime = '';
    switch (key){
      case 'id':
        conds._id= value;
        break;
      case 'name':
      case 'color':
      case 'icon':
        conds.name = { $regex: value };
        break;
      case 'status':
        conds.status = { $in: value };
        break;
      case 'startUpdateTime':
      case 'endUpdateTime':
        startTime = params.startUpdateTime;
        endTime = params.endUpdateTime;
        conds.updateTime = getTimeConds(startTime, endTime);
        break;
      case 'startCreationTime':
      case 'endCreationTime':
        startTime = params.startCreationTime;
        endTime = params.endCreationTime;
        conds.creationTime = getTimeConds(startTime, endTime);
        break;
      default :
        conds[key] = value;
        break;
    }
  });
  return conds;
}

/**
 * 获取标签列表
 * @param {Object}  ctx      koa上下文
 * @param {Object}  params  查询参数
 * @param {Object}  page    分页参数
 */
module.exports.getTagList = async ({ctx, params, page}) => {
  const modelTag = ctx.db.mongo.Tag;
  const conds = getConditions(params);
  const total = await modelTag.find(conds).count();
  let list = [];
  if (page){
    const skip = (page.page - 1) * page.pageSize;
    const limit = page.pageSize;
    list = await modelTag.find(conds).skip(skip).limit(limit);
  } else {
    list = await modelTag.find(conds);
  }
  return {list, page: {...page, total}};
}

/**
 * 创建标签
 * @param {Object}  ctx     koa上下文
 * @param {Object}  body    创建信息
 * @param {Object}  params  查询参数
 * @param {Object}  page    分页参数
 */
module.exports.createTags = async ({ ctx, body, params, page }) => {
  const modelTag = ctx.db.mongo.Tag;
  let tagList = {};
  const curr = await modelTag.insertMany(body.map(v => ({
    ...v,
    creator: "创建人先写死",
    updater: "更新人先写死(创建时加的)",
  })));
  params && (tagList = await this.getTagList({ ctx, params, page }));
  return {...tagList, curr};
}


module.exports.updateTags = async ({ ids, body, params, page, ctx }) => {
  const modelTag = ctx.db.mongo.Tag;

  await modelTag.updateMany({}, body, {});
  const curr = await modelTag.find({_id: {$in: ids}});
  console.log('================================');
  console.log(curr);
  return {};
}
