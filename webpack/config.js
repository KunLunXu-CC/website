const path = require('path');

// 自动加载 配置
module.exports.providePlugin = {
  _: 'lodash',
  lodash: 'lodash',
};

/* 路径别名配置 */
module.exports.alias = {
  '@app': path.resolve(__dirname, '../src/app'),
  '@model': path.resolve(__dirname, '../src/model'),
  '@hook': path.resolve(__dirname, '../src/hook'),
  '@pages': path.resolve(__dirname, '../src/pages'),
  '@utils': path.resolve(__dirname, '../src/utils'),
  '@config': path.resolve(__dirname, '../src/config'),
  '@assets': path.resolve(__dirname, '../src/assets'),
};

/* 全局变量 */
module.exports.globalConsts = {
  // 生产环境配置
  production: {
    _DEV_: false,
    GLOBAL_SERVICER: {
      HOST: JSON.stringify('https://www.qianyin925.com:4000'),
      GRAPHQL_URL: JSON.stringify('/graphql'),
    },
    WS_SERVICER: JSON.stringify('ws://www.qianyin925.com:4000'),
  },

  // 开发环境配置
  development: {
    _DEV_: true,
    GLOBAL_SERVICER: {
      HOST: JSON.stringify('http://localhost:4000'),
      GRAPHQL_URL: JSON.stringify('/graphql'),
    },
    WS_SERVICER: JSON.stringify('ws://localhost:4000'),
  },
};
