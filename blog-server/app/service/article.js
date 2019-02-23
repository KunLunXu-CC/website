
const { STATUS, RESCODE } = require('../config/conts');
const { getTimeConds } = require('../utils/helper');
const _ = require('lodash');


/**
 * 创建标签
 * @param {Object}  ctx     koa上下文
 * @param {Object}  body    创建信息
 * @param {Object}  params  查询参数
 * @param {Object}  page    分页参数
 */
module.exports.createArticles = async ({ ctx, body, params, orderBy, page }) => {
  const { data, modelArticle } = getBaseDataAndModel({ctx, initMessage: '创建成功'});
  try {
    data.change = await modelArticle.insertMany(body.map(v => ({
      ...v,
      creator: "创建人先写死",
      updater: "更新人先写死(创建时加的)",
    })));
  } catch(e) { 
    data.rescode = RESCODE.FAIL;
    data.message = '创建失败';
  }
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
  const modelArticle = ctx.db.mongo.Article;
  return {data, modelArticle};
}
