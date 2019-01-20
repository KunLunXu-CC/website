const _ = require('lodash');
const fs = require('fs');
const path = require('path');

/**
 * 映射指定路径下的所有指定后缀文件
 * @param {String} pathUrl 指定路径
 * @param {String} suffix  指定文件后缀
 */
module.exports.mapFiles = (pathUrl, suffix = 'js') => {
  const tree = {};
  const [dirs, files] = _.partition(fs.readdirSync(pathUrl), p => {
    return fs.statSync(path.join(pathUrl, p)).isDirectory();
  });

  files.forEach( file => {
    if (path.extname(file) === `.${suffix}`){
      const fileName = path.basename(file).split('.')[0];
      tree[fileName] = require(path.join(pathUrl, file));
    }
  });
  return tree
}
