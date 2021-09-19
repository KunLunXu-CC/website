const path = require('path');

module.exports = {
  globals: {
    $console: true,
    GLOBAL_SERVICER: true,
    WS_SERVICER: true,
    PUBLICKEY: true,
  },
  extends: [
    path.resolve(__dirname, './node_modules/qy-norm/.eslintrc.js'),
  ],
};
