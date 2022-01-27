import axios from '@utils/request';
import { PHOTO_TYPE } from '@config/consts';


/**
 * 获取所有图片: 桌面、缩略图、头像
 * @return {Objject[]} 返回查询到的列表数据
 */
export const getPhotos = async () => {
  const search = {
    type: [
      PHOTO_TYPE.THUMB.VALUE,
      PHOTO_TYPE.AVATAR.VALUE,
      PHOTO_TYPE.DESKTOP.VALUE,
    ],
  };
  const res = await axios({
    url: GLOBAL_SERVICER.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { search },
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
    },
  });
  return res?.data.data.photos.list ?? [];
};

// 占位: 要不然 eslint 将会抛错
export const place = () => {};
