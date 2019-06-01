const path = require('path');

/* 路径别名配置 */
module.exports.alias = {
  '@app': path.resolve(__dirname, '../src/app'),      
  '@api': path.resolve(__dirname, '../src/api'),
  '@home': path.resolve(__dirname, '../src/home'),
  '@hook': path.resolve(__dirname, '../src/hook'),
  '@store': path.resolve(__dirname, '../src/store'),      
  '@utils': path.resolve(__dirname, '../src/utils'),
  '@config': path.resolve(__dirname, '../src/config'),
  '@assets': path.resolve(__dirname, '../src/assets'),
  '@components': path.resolve(__dirname, '../src/components')
}

/* 全局变量 */
module.exports.globalConsts = {
  // 生产
  production: {
    GLOBAL_SERVER: JSON.stringify('http://localhost:4000'),
  },

  // 开发
  development: {
    _DEV_: true,
    GLOBAL_SERVER: JSON.stringify('http://localhost:4000'),
  },
}
