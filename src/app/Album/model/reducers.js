import { initState } from './index.model';

/**
 * 设置 album.photos
 * 1. reducer: action = { type: 'album/setPhotos' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {Object} action.search 要修改的 search
 * @return {Object} 更新后的状态
 */
export const setPhotos = (state, { photos }) => ({
  ... state,
  photos,
});

/**
 * 设置 album.search
 * 1. reducer: action = { type: 'album/setSearch' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {Object} action.search 要修改的 search
 * @return {Object} 更新后的状态
 */
export const setSearch = (state, { search }) => ({
  ... state,
  search: {
    ... state.search,
    ... search,
  },
});

/**
 * 打开上传表单
 * 1. reducer: action = { type: 'album/openUploadForm' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @return {Object} 更新后的状态
 */
export const openUploadForm = state => ({
  ... state,
  upload: {
    ... state.upload,
    show: true,
  },
});

/**
 * 关闭上传表单
 * 1. reducer: action = { type: 'album/closeUploadForm' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @return {Object} 更新后的状态
 */
export const closeUploadForm = state => ({
  ... state,
  upload: initState.upload,
});

/**
 * 设置上传文件类型
 * 1. reducer: action = { type: 'album/setUploadType' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {String} uploadType 文件类型
 * @return {Object} 更新后的状态
 */
export const setUploadType = (state, { uploadType }) => ({
  ... state,
  upload: {
    ... state.upload,
    type: uploadType,
  },
});

/**
 * 添加待上传文件
 * 1. reducer: action = { type: 'album/addUploadFiles' }
 * 2. 本项目所有 reducer 对应 action.type = ${model 命名空间}/${reducer 函数名}
 *
 * @param {Object} state 当前 state
 * @param {File[]} files 添加文件列表
 * @return {Object} 更新后的状态
 */
export const addUploadFiles = (state, { files }) => ({
  ... state,
  upload: {
    ... state.upload,
    files: [... state.upload.files, ... files],
  },
});
