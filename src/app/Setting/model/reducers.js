
/**
 * 设置配置
 * 1. reducer: action = { type: 'settingManage/toggleSelectedMenuKey' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {String} action.selectedMenuKey 要替换的 selectedMenuKey
 * @return {Object} 更新后的状态
 */
export const toggleSelectedMenuKey = (state, { selectedMenuKey }) => ({
  ...state,
  selectedMenuKey,
});

export const space = (state) => state;  // 占位
