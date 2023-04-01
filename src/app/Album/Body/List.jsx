import dayjs from 'dayjs';
import scss from './list.module.scss';

import { Empty } from 'antd';
import { actions } from '@store';
import { getOssUrl } from '@utils';
import { useCallback } from 'react';
import { Image, Icon } from '@kunlunxu/brick';
import { PHOTO_TYPE } from '@config/constants';
import { useDispatch, useSelector } from 'react-redux';
import { useRemovePhotosMutation } from '@store/graphql';

export default () => {
  const dispatch = useDispatch();
  const [removePhotos] = useRemovePhotosMutation();

  // 列表数据
  const listData = useSelector((state) => {
    const { photos, search: { type } } = state.photos;
    return photos.filter((v) => type === 'all' || String(v.type) === type);
  });

  // 删除
  const handleDelete = useCallback(async ({ id }) => {
    const { data } = await removePhotos({ conds: { id } });
    dispatch(actions.photos.removePhotos(data.removePhotos.change));
  }, [removePhotos, dispatch]);

  return (
    <div className={scss.list}>
      {listData.length > 0 ?
        listData.map((item) => (
          <div
            key={item.name}
            className={scss.item}>
            <div className={scss.preview}>
              <div className={scss['preview-body']}>
                <Image src={getOssUrl(item.name)} />
              </div>
              <div className={scss['preview-mask']}>
                <Icon
                  type="icon-shanchu"
                  onClick={handleDelete.bind(null, item)}
                />
              </div>
            </div>
            <div className={scss.info}>
              <div className={scss['info-icon']}>
                <Icon type="icon-genghuanfengmian" />
              </div>
              <div className={scss['info-body']}>
                <div className={scss['info-body-desc']}>
                  {_.find(PHOTO_TYPE, (v) => v.VALUE === item.type)?.DESC ?? ''}
                </div>
                <div className={scss['info-body-time']}>
                  {dayjs(item.creationTime).format('YYYY / MM / DD')}
                </div>
              </div>
            </div>
          </div>
        )) :
        <Empty className={scss.empty} />
      }
    </div>
  );
};
