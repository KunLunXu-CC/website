/* 业务常量配置 */

// [操作类型] 编辑 删除 新增
export const OPERATING_TYPE = {
  EDIT: { VALUE: 'edit', DESC: '编辑' },
  DELETE: { VALUE: 'delete', DESC: '删除' },
  CREATE: { VALUE: 'create', DESC: '创建' },
};

// [标签] 颜色列表
export const TAG_COLORS = {
  BLUE: { VALUE: '#108EE9', DESC: '蓝色' },
  GREEN: { VALUE: '#87D068', DESC: '绿色' },
  CORAL: { VALUE: '#FF7F50', DESC: '珊瑚' },
  FUCHSIA: { VALUE: '#FF00FF', DESC: '紫红色' },
  HOT_PINK: { VALUE: '#FF69B4', DESC: '火粉红' },
  LIGHT_BLUE: { VALUE: '#2DB7F5', DESC: '淡蓝' },
  ORANGE_RED: { VALUE: '#FF5500', DESC: '橙红色' },
};

// [标签] 图标列表
export const TAG_ICONS = {
  JS: { VALUE: '#icon-js', DESC: 'JS' },
  CSS: { VALUE: '#icon-css', DESC: 'CSS' },
  WEB: { VALUE: '#icon-qianduan', DESC: '前端' },
  DOCKER: { VALUE: '#icon-docker', DESC: 'docker' },
  UBUNTU: { VALUE: '#icon-ubuntu', DESC: 'ubuntu' },
};

// [状态] 模型基本状态 (0: 禁用， 1： 启用， -11： 删除)
export const STATUS = {
  DISABLE: 0,     // 禁用
  ENABLE: 1,      // 启用
  DELETE: -11,    // 删除
};

// [状态] 文章状态： 基础状态 + 保存 + 发布
export const ARTICLE_STATUS = {
  ... STATUS,        // 基础状态
  SAVE: 10,          // 保存(未发布)
  RELEASE: 11,       // 发布(已发布)
};

// [状态]响应状态
export const RESCODE = {
  SUCCESS: { VALUE: 1, DESC: '成功' },
  FAIL: { VALUE: 0, DESC: '失败' },
};

// 图片类型(使用场景)
export const PHOTO_TYPE = {
  UNKNOWN: { VALUE: 0, DESC: '未知' },         // 未知
  ARTICLE: { VALUE: 1, DESC: '文章' },         // 文章(包括专用缩略图)
  DESKTOP: { VALUE: 2, DESC: '桌面背景' },      // 桌面
  THUMB: { VALUE: 3, DESC: '缩略图' },          // 封面(通用)
  AVATAR: { VALUE: 4, DESC: '头像' },           // 头像
};

// tag 默认状态(所有)
export const TAG_ALL = {
  id: 'all',
  name: '全部',
  icon: 'icon-all',
};
