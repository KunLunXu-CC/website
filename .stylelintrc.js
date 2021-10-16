const path = require('path');

module.exports = {
  extends: [
    path.resolve(__dirname, './node_modules/qy-norm/.stylelintrc.js'),
  ],
  rules: {
    'selector-max-compound-selectors': 4,
  },
  ignoreFiles: ['**/*.js', '**/*.ts', '**/*.jsx', '**/*.tsx']
};
