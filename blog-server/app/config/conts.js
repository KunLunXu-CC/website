/* 常量配置 */

// 模型基本状态 (0: 禁用， 1： 启用， -1： 删除)
module.exports.STATUS = {
  DISABLE: 0,     // 禁用： 保存
  ENABLE: 1,      // 启用： 发布
  DELETE: -11,
}

// 响应状态 (1: 成功, 0: 失败)
module.exports.RESCODE = {
  SUCCESS: 1,
  FAIL: 0
};
