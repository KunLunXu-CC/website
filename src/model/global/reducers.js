import { PHOTO_TYPE } from '@config/consts';

/**
 * 设置 global.photos
 * 1. reducer: action = { type: 'app/setPhotos' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {Object} action.photos 异步获取到的图片列表
 * @return {Object} 更新后的状态
 */
export const setPhotos = (state, { photos }) => ({
  ... state,
  photos: {
    thumb: photos.filter(v => v.type === PHOTO_TYPE.THUMB.VALUE),
    avatar: photos.filter(v => v.type === PHOTO_TYPE.AVATAR.VALUE),
    desktop: photos.filter(v => v.type === PHOTO_TYPE.DESKTOP.VALUE),
  },
});

// 占位: 要不然 eslint 将会抛错
export const place = () => {};
