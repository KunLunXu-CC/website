import { APP_CODE, ARTICLE_STATUS } from '@config/consts';

// 弹窗类型常量 - 发布
export const RELEASE_CONFIRM = 'EDITOR_RELEASE_CONFIRM';

// 弹窗类型常量 - 撤销
export const REVOKE_CONFIRM = 'EDITOR_REVOKE_CONFIRM';

// 弹窗类型常量 - 缩略图配置
export const THUMB_SETTING = 'EDITOR_THUMB_SETTING';

// 弹窗类型常量 - 移动文章
export const MOVE = 'EDITOR_MOVE';

// Activity 配置
export const ACTIVITY_LIST = [
  {
    key: 'all',
    title: '全部',
    icon: 'icon-all',
    status: null,
  },
  {
    title: '未发布',
    icon: 'icon-editor',
    key: ARTICLE_STATUS.SAVE,
  },
  {
    title: '已发布',
    icon: 'icon-fabu',
    key: ARTICLE_STATUS.RELEASE,
  },
];

// message 配置
export const MESSAGE_CONFIG = {
  bottom: 10,
  code: APP_CODE.EDITOR,
  placement: 'bottomRight',
};
