import { ARTICLE_STATUS } from '@config/consts';

// 弹窗类型常量 - 发布
export const RELEASE_CONFIRM = 'EDITOR_RELEASE_CONFIRM';

// 弹窗类型常量 - 撤销
export const REVOKE_CONFIRM = 'EDITOR_REVOKE_CONFIRM';

// 弹窗类型常量 - 缩略图配置
export const THUMB_SETTING = 'EDITOR_THUMB_SETTING';

// side 菜单配置
export const SIDE_MENU = [
  {
    key: 'all',
    title: '全部',
    icon: 'icon-all',
  },
  {
    title: '未发布',
    icon: 'icon-xiajia',
    key: ARTICLE_STATUS.SAVE,
  },
  {
    title: '已发布',
    icon: 'icon-fabu',
    key: ARTICLE_STATUS.RELEASE,
  },
];
