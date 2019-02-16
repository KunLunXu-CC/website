/* 业务常量配置 */

// [操作类型] 编辑 删除 新增
export const OPERATING_TYPE = {
  EDIT: { value: 'edit', desc: '编辑' },
  DELETE: { value: 'delete', desc: '删除' },
  CREATE: { value: 'create', desc: '创建' }
}; 

// [标签] 颜色列表
export const TAG_COLORS = {    
  BLUE: { value: '#108EE9', desc: '蓝色' },
  GREEN: { value: '#87D068', desc: '绿色' },
  CORAL: { value: '#FF7F50', desc: '珊瑚' },
  FUCHSIA: { value: '#FF00FF', desc: '紫红色' },
  HOT_PINK: { value: '#FF69B4', desc: '火粉红' },
  LIGHT_BLUE: { value: '#2DB7F5', desc: '淡蓝' },
  ORANGE_RED: { value: '#FF5500', desc: '橙红色' },
}

// [标签]　图标列表
export const TAG_ICONS = {
  JS: { value: '#icon-js', desc: 'JS' },
  CSS: { value: '#icon-css', desc: 'CSS' },
  WEB: { value: '#icon-qianduan', desc: '前端' },
  DOCKER: { value: '#icon-docker', desc: 'docker' },
  UBUNTU: { value: '#icon-ubuntu', desc: 'ubuntu' },
};
