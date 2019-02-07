const { STATUS, RESCODE } = require('../config/constant');
const { getTimeConds } = require('../utils/helper');
const _ = require('lodash');

/**
 * 创建标签
 * @param {Object}  ctx     koa上下文
 * @param {Object}  body    创建信息
 * @param {Object}  params  查询参数
 * @param {Object}  page    分页参数
 */
module.exports.createTags = async ({ ctx, body, params, orderBy, page }) => {
  const {data, modelTag} = getBaseDataAndModel({ctx, initMessage: '创建成功'});
  try {
    data.change = await modelTag.insertMany(body.map(v => ({
      ...v,
      creator: "创建人先写死",
      updater: "更新人先写死(创建时加的)",
    })));
  } catch(e) { 
    data.rescode = RESCODE.FAIL;
    data.message = '创建失败';
  }
  if (params){
    const tagList = await this.getTagList({ ctx, params, page, orderBy });
    data.list = tagList.list || [];
    data.page = tagList.page || {};
  } 
  return data;
}

/**
 * 通过 ids 删除标签（假删）
 * @param {Object} ctx      koa 上下文
 * @param {Object} ids      要删除数据的 id 集合
 * @param {Object} params   查询参数
 * @param {Object} page     分页信息
 */
module.exports.removeTagByIds = async ({ ctx, ids, params, orderBy, page }) => {
  const {data, modelTag} = getBaseDataAndModel({ctx, initMessage: '删除成功'});
  const changeConds = { _id: { $in: ids }, status: {$ne: STATUS.DELETE} };
  const isRelyError = await tJudgeIsRely(ctx, ids);
  if (isRelyError){ // 存在依赖， 不能直接删除
    data.rescode = RESCODE.FAIL;
    data.message = isRelyError;
  } else {
    try {
      await modelTag.updateMany(changeConds, { status: STATUS.DELETE });
    } catch (e) {
      data.rescode = RESCODE.FAIL;
      data.message = '删除失败';
    }
  }
  if (params){
    const tagList = await this.getTagList({ ctx, params, orderBy, page });
    data.list = tagList.list || [];
    data.page = tagList.page || {};
  } 
  data.change = await modelTag.find(changeConds);
  return data;
}

/**
 * 通过 ids 修改标签
 * @param {Object}  ctx     koa上下文
 * @param {Object}  ids     要修改数据的 id 集合
 * @param {Object}  body    创建信息
 * @param {Object}  params  查询参数
 * @param {Object}  page    分页信息
 */
module.exports.updateTagByIds = async ({ ctx, ids, body, orderBy, params, page }) => {
  const {data, modelTag} = getBaseDataAndModel({ctx, initMessage: '修改成功'});
  try {
    body.updateTime = Date.now();
    body.updater = '更新人暂定';
    await modelTag.updateMany({ _id: { $in: ids }}, body, {});
  } catch (e) {
    data.message = RESCODE.FAIL;
    data.message = '修改失败';
  }
  if (params){
    const tagList = await this.getTagList({ ctx, params, page, orderBy });
    data.list = tagList.list || [];
    data.page = tagList.page || {};
  }
  data.change = await modelTag.find({ _id: { $in: ids }});
  return data;
}

/**
 * 获取标签列表
 * @param {Object}  ctx      koa上下文
 * @param {Object}  params  查询参数
 * @param {Object}  page    分页参数
 */
module.exports.getTagList = async ({ ctx, params, page, orderBy }) => {
  const {data, modelTag} = getBaseDataAndModel({ctx, initMessage: '请求成功'});
  const conds = getConditions(params);
  data.page = { ...page };
  data.stats.total = await modelTag.find(conds).count();
  try {
    if (page){
      const sort = orderBy || {};
      const skip = ( page.page - 1 ) * page.pageSize;
      const limit = page.pageSize;
      data.list = await modelTag.find(conds).skip(skip).limit(limit).sort(sort);
    } else {
      data.list = await modelTag.find(conds);
    }
  } catch (e) {
    data.rescode = RESCODE.FAIL;
    data.message = '请求失败';
  }
  return data;
}

/**
 * 获取基础返回数据模型以及模型
 * @param {Object} ctx          koa 上下文
 * @param {String} initMessage  初始返回信息
 */
const getBaseDataAndModel = ({ctx, initMessage}) => {
  const data = {
    rescode: RESCODE.SUCCESS, 
    message: initMessage, 
    list: [], 
    page: {}, 
    stats: {},
    change: []
  };
  const modelTag = ctx.db.mongo.Tag;
  return {data, modelTag};
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
