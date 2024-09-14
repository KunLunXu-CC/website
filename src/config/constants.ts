/* 业务常量配置 */
import { getOssUrl } from '@/utils';

// 默认用户头像
export const DEFAULT_USER_AVATAR = 'klx.pro.tinify.e07793859fadd13b57564dd36ddb66ef.png';

// 应用 code
export enum APP_CODE {
  AI = 'ai',
  ALBUM = 'album',
  EDITOR = 'editor',
  READER = 'reader',
  DIARY = 'diary',
  MONITORING = 'monitoring',
  SETTING = 'setting',
  USER = 'user',
}

// 应用 配置
export const APP_SETTING = {
  [APP_CODE.AI]: {
    name: 'AI',
    code: APP_CODE.AI,
    icon: getOssUrl('klx.pro.abf8398cdc33310c6bf5b439a890da0a.svg'),
  },
  [APP_CODE.ALBUM]: {
    name: '相册',
    code: APP_CODE.ALBUM,
    icon: getOssUrl('klx.pro.a0200bdbf017134abc741194fd98faf8.svg'),
  },
  [APP_CODE.EDITOR]: {
    name: '编辑器',
    code: APP_CODE.EDITOR,
    icon: getOssUrl('klx.pro.510a9a0f9a06596a9debe051979ae81c.svg'),
  },
  [APP_CODE.READER]: {
    name: '阅读',
    code: APP_CODE.READER,
    icon: getOssUrl('klx.pro.626304a5235e36b3bddf04e2f688b5df.svg'),
  },
  [APP_CODE.DIARY]: {
    name: '日记',
    code: APP_CODE.DIARY,
    icon: getOssUrl('klx.pro.271ab305dd478bb0332ddc5db76219fc.svg'),
  },
  [APP_CODE.MONITORING]: {
    name: '鉴查院',
    code: APP_CODE.MONITORING,
    icon: getOssUrl('klx.pro.446ad243a8ff5ab63e1c774bbea5db93.svg'),
  },
  [APP_CODE.SETTING]: {
    code: APP_CODE.SETTING,
    name: '偏好设置',
    icon: getOssUrl('klx.pro.4a3046239475ce8e5e87c1f056d2b973.svg'),
  },

  [APP_CODE.USER]: {
    name: '用户管理',
    code: APP_CODE.USER,
    icon: getOssUrl('klx.pro.d1fb923369fb7b28217133738e37ba2f.svg'),
  },
};

// 布尔值
export const BOOLEAN = {
  TRUE: 1,
  FALSE: 0,
};

// [状态] 模型基本状态 (0: 禁用， 1： 启用， -11： 删除)
export const STATUS = {
  DISABLE: 0, // 禁用
  ENABLE: 1, // 启用
  DELETE: -11, // 删除
};

// [状态] 文章状态： 基础状态 + 保存 + 发布
export const ARTICLE_STATUS = {
  ...STATUS, // 基础状态
  SAVE: 10, // 保存(未发布)
  RELEASE: 11, // 发布(已发布)
};

// 图片类型(使用场景)
// TODO: 改为枚举类型
export const PHOTO_TYPE = {
  UNKNOWN: { VALUE: 0, DESC: '未知' }, // 未知
  ARTICLE: { VALUE: 1, DESC: '文章' }, // 文章(包括专用缩略图)
  DESKTOP: { VALUE: 2, DESC: '桌面背景' }, // 桌面
  THUMB: { VALUE: 3, DESC: '缩略图' }, // 封面(通用)
  AVATAR: { VALUE: 4, DESC: '头像' }, // 头像
  ICON: { VALUE: 5, DESC: '应用图标' }, // 图标
};

// JWT cookie key
export const JWT_COOKIE_KEY = 'jwt_token';
