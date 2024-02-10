/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  globals: {
    $console: true,
    PUBLICKEY: true,
    GRAPHQL_URL: true,
    WS_SERVICER: true,
    GLOBAL_SERVICER: true,
    GITHUB_APP_CLIENT_ID: true,
  },
  extends: [path.resolve(__dirname, './node_modules/@kunlunxu/norm/.eslintrc.ts.js')],
};
