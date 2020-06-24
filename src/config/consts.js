/* 业务常量配置 */

// 应用 CODE
export const APP_CODE = {
  READ: 'read',                  // 阅读
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

// 字典类型
export const DATASETSFROM_CODE = {
  BILL_TAG: { VALUE: 1, DESC: '账单(标签)', ICON: 'icon-dingdanjine' },
  DIET_TAG: { VALUE: 2, DESC: '饮食(标签)', ICON: 'icon-yinshi' },
  FITNESS_PLACE: { VALUE: 3, DESC: '健身部位', ICON: 'icon-buwei' },
  FITNESS_TYPE: { VALUE: 4, DESC: '健身类型', ICON: 'icon-leixing' },

  SNIPPETS_TAG: { VALUE: 6, DESC: '代码块', ICON: 'icon-daimakuai' },
  INTERVIEW_TAG: { VALUE: 7, DESC: '面试题', ICON: 'icon-mianshitiku' },
  ALGORITHM_TAG: { VALUE: 8, DESC: '算法', ICON: 'icon-suanfa' },
};

// 统计跨度
export const STATS_SAPN = {
  DAY: { VALUE: 'day', DESC: '天' },      // 按天
  WEEK: { VALUE: 'week', DESC: '周' },    // 按周
  MONTH: { VALUE: 'month', DESC: '月' },  // 按月
  YEAR: { VALUE: 'year', DESC: '年' },    // 按年
};
