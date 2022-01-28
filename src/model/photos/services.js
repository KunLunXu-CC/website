import axios from '@utils/request';

/**
 * 获取所有图片: 桌面、缩略图、头像
 * @return {Object[]} 返回查询到的列表数据
 */
export const getPhotos = axios({
  query: `
    query($search: PhotoSearch){
      photos(search: $search){
        list {
          id
          type
          name
        }
      }
    }`,
  getRes: (res) => res.photos.list ?? [],
});

// 占位: 要不然 eslint 将会抛错
export const place = () => {};
