const { requireFiles } = require('../../utils');
const path = require('path');
module.exports = requireFiles({ dir: path.resolve(__dirname, '.') });
