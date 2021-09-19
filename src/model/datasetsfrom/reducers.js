/**
 * 设置字典列表
 * 1. reducer: action = { type: 'datasetsfrom/setDatasetsfroms' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {String} action.datasetsfroms 要替换的 datasetsfrom 列表
 * @return {Object} 更新后的状态
 */
export const setDatasetsfroms = (state, { datasetsfroms }) => _.groupBy(
  datasetsfroms, 'code',
);

export const space = {};
