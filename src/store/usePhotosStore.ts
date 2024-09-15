import { create } from 'zustand';
import { Photo } from '@/gql/graphql';
import { groupBy } from 'lodash';
import { PHOTO_TYPE } from '@/config/constants';

interface IPhotosState {
  desktop: Photo[];
  avatar: Photo[];
  thumb: Photo[];

  search: {
    type: string;
    sourceFileName: any;
  };

  upload: {
    files: any[];
    show: boolean;
    type: string | undefined;
  };

  photos: Photo[];
}

interface IPhotosStore extends IPhotosState {
  initPhotosStore: (photos: Photo[]) => void;
  updateSearch: (photos: Photo[]) => void;
  updateUpload: (photos: Photo[]) => void;
  removePhotos: (photos: Photo[]) => void;
  appendPhotos: (photos: Photo[]) => void;
}

const usePhotosStore = create<IPhotosStore>((set, get) => ({
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

  initPhotosStore: (photos) => {
    const group = groupBy(photos, 'type');

    set({
      photos,
      thumb: group[PHOTO_TYPE.THUMB.VALUE] || [],
      avatar: group[PHOTO_TYPE.AVATAR.VALUE] || [],
      desktop: group[PHOTO_TYPE.DESKTOP.VALUE] || [],
    });
  },

  // 更新查询参数
  updateSearch: (search) =>
    set({
      search: {
        ...get().search,
        ...search,
      },
    }),

  // 更新 upload
  updateUpload: (upload) =>
    set({
      upload: {
        ...get().upload,
        ...upload,
      },
    }),

  // 删除图片
  removePhotos: (removes) =>
    set({
      photos: get().photos.filter((v) => removes.every((ele) => ele.id !== v.id)),
    }),

  // 追加图片
  appendPhotos: (appends) =>
    set({
      photos: [...get().photos, ...appends],
    }),
}));

export default usePhotosStore;
