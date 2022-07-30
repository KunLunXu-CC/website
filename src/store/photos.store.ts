import _ from 'lodash';
import { PHOTO_TYPE } from '@config/consts';
import { createSlice } from '@reduxjs/toolkit';

// TODO: 改为对象存储 oss

export interface Photo {
  id: string,
  name: string,
  type: number,
}

export interface photosStore {
  desktop: Photo[],
  avatar: Photo[],
  thumb: Photo[],

  search: {
    type: string
    sourceFileName: any
  }

  upload: {
    files: any[],
    show: boolean,
    type: string | undefined,
  },

  photos: Photo[]
}

export const initialState: photosStore = {
  desktop: [],
  avatar: [],
  thumb: [],

  search: {
    type: 'all',
    sourceFileName: void 0,
  },

  upload: {
    files: [],
    show: false,
    type: void 0,
  },

  photos: [],
};

export default createSlice({
  initialState,
  name: 'photos',
  reducers: {
    init: (state, { payload: photos }) => {
      const groupBy = _.groupBy(photos, 'type');
      return {
        ...state,
        photos,
        thumb: groupBy[PHOTO_TYPE.THUMB.VALUE] || [],
        avatar: groupBy[PHOTO_TYPE.AVATAR.VALUE] || [],
        desktop: groupBy[PHOTO_TYPE.DESKTOP.VALUE] || [],
      };
    },

    // 更新查询参数
    updateSearch: (state, { payload: search }) => ({
      ...state,
      search: {
        ...state.search,
        ...search,
      },
    }),

    // 更新 upload
    updateUpload: (state, { payload: upload }) => ({
      ...state,
      upload: {
        ...state.upload,
        ...upload,
      },
    }),

    // 删除图片
    removePhotos: (state, { payload: removes }) => ({
      ...state,
      photos: state.photos.filter(
        (v) => removes.every((ele: { id: string }) => ele.id !== v.id),
      ),
    }),

    // 追加图片
    appendPhotos: (state, { payload: appends }) => ({
      ...state,
      photos: [...state.photos, ...appends],
    }),
  },
});
