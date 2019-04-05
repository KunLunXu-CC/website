const path = require('path');

module.exports.alias = {
  '@app': path.resolve(__dirname, '../src/app'),      
  '@api': path.resolve(__dirname, '../src/api'),
  '@hook': path.resolve(__dirname, '../src/hook'),
  '@utils': path.resolve(__dirname, '../src/utils'),
  '@layout': path.resolve(__dirname, '../src/layout'),
  '@config': path.resolve(__dirname, '../src/config'),
  '@assets': path.resolve(__dirname, '../src/assets'),
  '@components': path.resolve(__dirname, '../src/components')
}

/* 全局变量 */
module.exports.globalConsts = {
  /* 生产 */
  production: {
    GLOBAL_BLOG_SERVER: JSON.stringify('http://localhost:4000'),
  },

  /* 开发 */
  development: {
    GLOBAL_BLOG_SERVER: JSON.stringify('http://localhost:4000'),
  },

}
