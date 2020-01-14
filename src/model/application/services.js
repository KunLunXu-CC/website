
import _ from 'lodash';
import axios from '@utils/request';
import { PHOTO_TYPE } from '@config/consts';

export const getPhotos = async () => {
  const search = {
    type: [
      PHOTO_TYPE.THUMB.VALUE,
      PHOTO_TYPE.AVATAR.VALUE,
      PHOTO_TYPE.DESKTOP.VALUE,
    ],
  };
  const res = await axios({
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { search },
      query: `
        query($search: PhotoSearch){
          photos(search: $search){
            list {
              id
              url
              type
            }
          }
        }`,
    },
  });
  return _.get(res, 'data.data.photos.list') || [];
};
