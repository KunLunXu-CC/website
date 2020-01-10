const path = require('path');

// 自动加载 配置
module.exports.providePlugin = {
  _: 'lodash',
  lodash: 'lodash',
};

/* 路径别名配置 */
module.exports.alias = {
  '@app': path.resolve(__dirname, '../src/app'),
  '@api': path.resolve(__dirname, '../src/api'),
  '@hook': path.resolve(__dirname, '../src/hook'),
  '@store': path.resolve(__dirname, '../src/store'),
  '@pages': path.resolve(__dirname, '../src/pages'),
  '@utils': path.resolve(__dirname, '../src/utils'),
  '@config': path.resolve(__dirname, '../src/config'),
  '@assets': path.resolve(__dirname, '../src/assets'),
}

/* 全局变量 */
module.exports.globalConsts = {
  // 生产环境配置
  production: {
    _DEV_: false,
    GLOBAL_SERVICE: {
      HOST: JSON.stringify('https://www.qianyin925.com:4000'),
      GRAPHQL_URL: JSON.stringify('/graphql'),
    },
  },

  // 开发环境配置
  development: {
    _DEV_: true,
    GLOBAL_SERVICE: {
      HOST: JSON.stringify('http://localhost:4000'),
      GRAPHQL_URL: JSON.stringify('/graphql'),
    },
  },
}
