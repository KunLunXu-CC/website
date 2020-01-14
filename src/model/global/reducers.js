import { PHOTO_TYPE } from '@config/consts';

/**
 * reducer: action = { type: 'global/getPhotos' }
 * 说明: 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {Object} payload action.payload
 * @return {Object} 更新后的状态
 */
export const getPhotos = (state, { payload = [] }) => ({
  ... state,
  photos: {
    thumb: payload.filter(v => v.type === PHOTO_TYPE.THUMB.VALUE),
    avatar: payload.filter(v => v.type === PHOTO_TYPE.AVATAR.VALUE),
    desktop: payload.filter(v => v.type === PHOTO_TYPE.DESKTOP.VALUE),
  },
});

export const place = () => {};
