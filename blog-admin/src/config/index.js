/*  全局常量配置 */

/* 生产 */
const production = {
  GLOBAL_BLOG_SERVER: JSON.stringify('http://localhost:4000'),
};

/* 开发 */
const development = {
  GLOBAL_BLOG_SERVER: JSON.stringify('http://localhost:4000'),
};
module.exports = { production, development };
