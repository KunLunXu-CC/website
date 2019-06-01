const _ = require('lodash');
const NodeRSA = require('node-rsa');
const { createHash } = require('../utils');
const { RESCODE } = require('../../config/conts');

/**
 * 解密
 * @param {String} data 待解密数据 
 */
const decrypt = (data) => {
  // 私钥
  const key = `-----BEGIN RSA PRIVATE KEY-----
  MIIBOQIBAAJBAIEKWBxz26d+y5CMgCVQxt/4uAO8wpFSVn/EsCawsV8z09tq+UyH
  Xt33x1rSabAZ1KW7etf9uqh0LS19LwtoGx0CAwEAAQJAIWlVQSC6ihbpjGbks0TE
  Ca/zrXwNgOUp4nFCDvKHKpf3DGsYawQGV7yMrHrBZm6A+2XtTI9YxN4HobwmwXrc
  vQIhAOYlV+wi2Vpo3JihN5RbRjBUCcf6UyBHfGz1l82JVEHnAiEAj4lbOhaWv7Zu
  f4bog8G4qUi0PN5KUS05hQ2keNosIlsCIBI0YgALwaWlJc3s8riJf8PS4fMvmeOz
  w+PaiWd4tXGBAiAJGjDK0jvlFHCVbby4/kPzmES1x3L3CuMm6OKRN2StGQIgAmBU
  zg20BYNe8rAsII4GFYbZFDqiRX9pO/v5yBF7Qhs=
  -----END RSA PRIVATE KEY-----`;
  // 传入私钥创建私钥对象
  const privateKey = new NodeRSA(key);
  let decrypted = '';
  try {
    decrypted = privateKey.decrypt(data, 'utf8');
  } catch (e) {
    return false;
  }
  return createHash({ data: decrypted });
}

module.exports.login = async ({ account, password, ctx }) => {
  const userServer = ctx.db.mongo.User;
  const data = { user: {}, rescode: RESCODE.SUCCESS, message: '登录成功' };

  const conds = { account, password: decrypt(password) };
  const user = data.user = (await userServer.findOne(conds)) || {};

  _.isEmpty(user) && (data.rescode = RESCODE.FAIL);
  _.isEmpty(user) && (data.message = '登录失败');
  return data;
};
