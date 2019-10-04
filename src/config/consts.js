/* 业务常量配置 */

// [操作类型] 编辑 删除 新增
export const OPERATING_TYPE = {
  EDIT: { VALUE: 'edit', DESC: '编辑' },
  DELETE: { VALUE: 'delete', DESC: '删除' },
  CREATE: { VALUE: 'create', DESC: '创建' }
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
}

// [标签] 图标列表
export const TAG_ICONS = {
  JS: { VALUE: '#icon-js', DESC: 'JS' },
  CSS: { VALUE: '#icon-css', DESC: 'CSS' },
  WEB: { VALUE: '#icon-qianduan', DESC: '前端' },
  DOCKER: { VALUE: '#icon-docker', DESC: 'docker' },
  UBUNTU: { VALUE: '#icon-ubuntu', DESC: 'ubuntu' },
};

// [状态] 模型基本状态
export const ARTICLE_STATUS = {
  SAVE: { VALUE: 6, DESC: '已保存' },
  RELEASE: {VALUE: 9, DESC: '已发布'},
  DELETE: {VALUE: -11, DESC: '已删除'}
}

// [状态]响应状态
export const RESCODE = {
  SUCCESS: { VALUE: 1, DESC: '成功' },
  FAIL: { VALUE: 0, DESC: '失败' }
};

// 图片类型(使用场景)
export const PHOTO_TYPE = {
  UNKNOWN: { VALUE: 0, DESC: '未知' },         // 未知
  ARTICLE: { VALUE: 1, DESC: '文章' },         // 文章
  DESKTOP: { VALUE: 2, DESC: '桌面' },         // 桌面
  COVER: { VALUE: 3, DESC: '封面' },           // 封面(通用)
};
