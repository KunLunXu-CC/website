/* 业务常量配置 */

// [状态] 模型基本状态 (0: 禁用， 1： 启用， -11： 删除)
export const STATUS = {
  DISABLE: 0,   // 禁用
  ENABLE: 1,    // 启用
  DELETE: -11,  // 删除
};

// [状态] 文章状态： 基础状态 + 保存 + 发布
export const ARTICLE_STATUS = {
  ... STATUS,        // 基础状态
  SAVE: 10,          // 保存(未发布)
  RELEASE: 11,       // 发布(已发布)
};

// 图片类型(使用场景)
export const PHOTO_TYPE = {
  UNKNOWN: { VALUE: 0, DESC: '未知' },          // 未知
  ARTICLE: { VALUE: 1, DESC: '文章' },          // 文章(包括专用缩略图)
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

// 加载中 code 列表
export const SPIN_CODE = {
  APP_ALBUM: 'APP_ALBUM',         // 相册
  APP_ARTICLE: 'APP_ARTICLE',     // 文章
  APP_EDITOR: 'APP_EDITOR',       // 编辑器
  APP_DIARY: 'APP_DIARY',         // 日记
};

// 提示信息 code
export const MESSAGE_CODE = {
  APP_ALBUM: 'MESSAGE_CODE_APP_ALBUM',         // 相册
  APP_ARTICLE: 'MESSAGE_CODE_APP_ARTICLE',     // 文章
  APP_EDITOR: 'MESSAGE_CODE_APP_EDITOR',       // 编辑器
  APP_DIARY: 'MESSAGE_CODE_APP_DIARY',         // 日记
};

// 饮食类型
export const DIET_TYPE = {
  BREAKFAST: { VALUE: 0, DESC: '早餐' },
  AFTER_BREAKFAST: { VALUE: 1, DESC: '上午加餐' },

  LUNCH: { VALUE: 2, DESC: '午餐' },
  AFTER_LUNCH: { VALUE: 3, DESC: '下午加餐' },

  DINNER: { VALUE: 4, DESC: '晚餐' },
  AFTER_DINNER: { VALUE: 5, DESC: '晚上加餐(夜宵)' },

  AFTER_FITNESS: { VALUE: 6, DESC: '健身加餐(健身之后)' },
};

// 健身运动类型
export const FITNESS_TYPE = {
  AEROBIC: { VALUE: 0, DESC: '有氧' },    // 有氧
  ANAEROBIC: { VALUE: 1, DESC: '无氧' },  // 无氧
};

// 健身部位
export const FITNESS_PLACE = {
  BACK: { VALUE: 0, DESC: '背' },
  CHEST: { VALUE: 1, DESC: '胸' },
  SHOULDER: { VALUE: 2, DESC: '肩' },
  TWO_HUMERUS: { VALUE: 3, DESC: '肱二头' },
  THREE_HUMERUS: { VALUE: 4, DESC: '肱三头' },
  ABDOMEN: { VALUE: 5, DESC: '腹' },
  LEG: { VALUE: 6, DESC: '腿' },
  SMALL_ARM: { VALUE: 7, DESC: '小臂' },
};

// 健身感受
export const FITNESS_FEEL = {
  VERY_BAD: { VALUE: 0, DESC: '很差' },
  DIFFERENCE: { VALUE: 1, DESC: '差' },
  COMMONLY: { VALUE: 2, DESC: '一般' },
  GOOD_GRADE: { VALUE: 3, DESC: '极好' },
};
