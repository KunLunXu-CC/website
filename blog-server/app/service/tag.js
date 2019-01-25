const { getTimeConds } = require('../utils/helper');
const { STATUS } = require('../config/constant');
const _ = require('lodash');

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
  const change = await modelTag.insertMany(body.map(v => ({
    ...v,
    creator: "创建人先写死",
    updater: "更新人先写死(创建时加的)",
  })));
  params && (tagList = await this.getTagList({ ctx, params, page }));
  return {...tagList, change};
}

/**
 * 通过 ids 删除标签（假删）
 * @param {Object} ctx      koa 上下文
 * @param {Object} ids      要删除数据的 id 集合
 * @param {Object} params   查询参数
 * @param {Object} page     分页信息
 */
module.exports.removeTagByIds = async ({ ctx, ids, params, page }) => {
  const isRelyError = await tJudgeIsRely(ctx, ids);
  const modelTag = ctx.db.mongo.Tag;
  if (isRelyError){
    // 存在依赖， 不能直接删除
    console.log('====>', isRelyError);
    return {};
  } else {
    let tagList = {};
    await modelTag.updateMany({ _id: { $in: ids }}, { status: STATUS.DELETE });
    const change = await modelTag.find({ _id: { $in: ids }});
    params && (tagList = await this.getTagList({ ctx, params, page }));
    return {...tagList, change};
  }
}

/**
 * 通过 ids 修改标签
 * @param {Object}  ctx     koa上下文
 * @param {Object}  ids     要修改数据的 id 集合
 * @param {Object}  body    创建信息
 * @param {Object}  params  查询参数
 * @param {Object}  page    分页信息
 */
module.exports.updateTagByIds = async ({ ctx, ids, body, params, page }) => {
  const modelTag = ctx.db.mongo.Tag;
  let tagList = {};
  await modelTag.updateMany({ _id: { $in: ids }}, body, {});
  const change = await modelTag.find({ _id: { $in: ids }});
  params && (tagList = await this.getTagList({ ctx, params, page }));
  return { ...tagList, change };
}

/**
 * 获取标签列表
 * @param {Object}  ctx      koa上下文
 * @param {Object}  params  查询参数
 * @param {Object}  page    分页参数
 */
module.exports.getTagList = async ({ ctx, params, page }) => {
  const modelTag = ctx.db.mongo.Tag;
  const conds = getConditions(params);
  const total = await modelTag.find( conds).count();
  let list = [];
  if (page){
    const skip = ( page.page - 1 ) * page.pageSize;
    const limit = page.pageSize;
    list = await modelTag.find(conds).skip(skip).limit(limit);
  } else {
    list = await modelTag.find(conds);
  }
  return { list, page: { ...page, total }};
}

/**
 * 获取查询条件
 * @param {Object} params 查询参数 
 */
const getConditions = ( params = {} ) => {
  const conds = { status: {$ne: STATUS.DELETE} };
  _.forIn(params, (value, key) => {
    let startTime = '';
    let endTime = '';
    switch (key){
      case 'id':
        conds._id= value;
        break;
      case 'ids':
        conds._id= {$in: value};
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
