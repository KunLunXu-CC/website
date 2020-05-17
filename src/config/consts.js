/* 业务常量配置 */

// 应用 CODE
export const APP_CODE = {
  ALBUM: 'album',                // 相册
  DIARY: 'diary',                // 日记
  EDITOR: 'editor',              // 编辑器
  ARTICLE: 'article',            // 文章
  DATASETSFROM: 'datasetsfrom',  // 数据字典(数据集)
};

// 服务器静态资源-图片 url
export const SERVICE_STATIC_IMAGE_URL
  = 'https://www.qianyin925.com/service/static/images/';

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

// 统计跨度
export const STATS_SAPN = {
  DAY: { VALUE: 'day', DESC: '天' },      // 按天
  WEEK: { VALUE: 'week', DESC: '周' },    // 按周
  MONTH: { VALUE: 'month', DESC: '月' },  // 按月
  YEAR: { VALUE: 'year', DESC: '年' },    // 按年
};

// 账单标签
export const BILL_TAG = {
  THREE_MEALS: { VALUE: 1, DESC: '三餐' },    // 早中晚三餐
  MEAL_ADDITION: { VALUE: 2, DESC: '加餐' },  // 零食、夜宵
  DINNER_PARTY: { VALUE: 3, DESC: '聚餐' },   // 聚餐
  FRUITS: { VALUE: 4, DESC: '水果' },         // 水果
  NECESSITY: { VALUE: 5, DESC: '生活必需品' },       // 生活必需品(牙膏、洗发水等等系列)
  FIXED_EXPENDITURE: { VALUE: 6, DESC: '固定支出' }, // 话费、房租、服务器、视频会员
  APPAREL_WEAR: { VALUE: 7, DESC: '服装穿戴' }, // 平时穿的衣服鞋子等
  FITNESS: { VALUE: 8, DESC: '健身' },         // 运动相关的: 健身卡、补剂、护具
  LARGE_SIZED: { VALUE: 9, DESC: '大件' },     // 大件: 电器、手机、电脑等

  ACCIDENT: { VALUE: 10, DESC: '意外' },        // 意外花销(生病)
};
