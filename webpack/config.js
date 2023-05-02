/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

// 自动加载 配置
module.exports.providePlugin = {
  _: 'lodash',
  lodash: 'lodash',
};

/* 路径别名配置 */
module.exports.alias = {
  '@app': path.resolve(__dirname, '../src/app'),
  '@hooks': path.resolve(__dirname, '../src/hooks'),
  '@pages': path.resolve(__dirname, '../src/pages'),
  '@utils': path.resolve(__dirname, '../src/utils'),
  '@store': path.resolve(__dirname, '../src/store'),
  '@config': path.resolve(__dirname, '../src/config'),
  '@assets': path.resolve(__dirname, '../src/assets'),
};

/* 全局变量 */
module.exports.globalConsts = {
  // 生产环境配置
  production: {
    _DEV_: false,
    WS_SERVICER: JSON.stringify('wss://www.kunlunxu.cc:4000'),
    GITHUB_APP_CLIENT_ID: JSON.stringify('276f6034688775fc70eb'),
    GRAPHQL_URL: JSON.stringify('https://www.kunlunxu.cc:4000/graphql'),
  },

  // 开发环境配置
  development: {
    _DEV_: true,
    WS_SERVICER: JSON.stringify('ws://localhost:4000'),
    GITHUB_APP_CLIENT_ID: JSON.stringify('6aa8689e618b1e87e483'),
    GRAPHQL_URL: JSON.stringify('http://localhost:4000/graphql'),
  },
};
