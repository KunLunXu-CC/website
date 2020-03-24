import { ARTICLE_STATUS } from '@config/consts';

// 弹窗类型常量 - 发布
export const RELEASE_CONFIRM = 'EDITOR_RELEASE_CONFIRM';

// 弹窗类型常量 - 撤销
export const REVOKE_CONFIRM = 'EDITOR_REVOKE_CONFIRM';

// 弹窗类型常量 - 缩略图配置
export const THUMB_SETTING = 'EDITOR_THUMB_SETTING';

// side 菜单配置
export const SIDE_MENU = {
  ALL: {
    KEY: 'all',
    TITLE: '全部',
    ICON: 'icon-all',
  },
  SAVE: {
    TITLE: '未发布',
    ICON: 'icon-xiajia',
    KEY: ARTICLE_STATUS.SAVE,
  },
  RELEASE: {
    TITLE: '已发布',
    ICON: 'icon-fabu',
    KEY: ARTICLE_STATUS.RELEASE,
  },
};
