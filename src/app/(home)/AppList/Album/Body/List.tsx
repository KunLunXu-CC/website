import dayjs from 'dayjs';
import scss from './list.module.scss';
import getOssUrl from '@/utils/getOssUrl';
import useAlbumRemove from '../hooks/useAlbumRemove';

import { Empty } from 'antd';
import { find } from 'lodash';
import { memo, useMemo } from 'react';
import { Image, Icon } from '@kunlunxu/brick';
import { PHOTO_TYPE } from '@/config/constants';
import useAlbumStore from '../hooks/useAlbumStore';
import { DEFAULT_ACTIVE_MENU_KEY } from '../constants';

const List = () => {
  const { onRemove } = useAlbumRemove();
  const { phoneList, activeMenuKey } = useAlbumStore();

  const listData = useMemo(
    () =>
      phoneList
        .filter((v) => {
          if (activeMenuKey === DEFAULT_ACTIVE_MENU_KEY) {
            return true;
          }
          return v.type === activeMenuKey;
        })
        .splice(0, 20),
    [activeMenuKey, phoneList],
  );

  return (
    <div className={scss.list}>
      {listData.length > 0 ? (
        listData.map((item) => (
          <div
            key={item.name}
            className={scss.item}>
            <div className={scss.preview}>
              <div className={scss['preview-body']}>
                <Image
                  alt="phone"
                  src={getOssUrl(item.name)}
                />
              </div>
              <div className={scss['preview-mask']}>
                <Icon
                  type="icon-shanchu"
                  onClick={onRemove.bind(null, item.id)}
                />
              </div>
            </div>
            <div className={scss.info}>
              <div className={scss['info-icon']}>
                <Icon type="icon-genghuanfengmian" />
              </div>
              <div className={scss['info-body']}>
                <div className={scss['info-body-desc']}>
                  {find(PHOTO_TYPE, (v) => v.VALUE === item.type)?.DESC ?? ''}
                </div>
                <div className={scss['info-body-time']}>{dayjs(item.creationTime).format('YYYY / MM / DD')}</div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <Empty className={scss.empty} />
      )}
    </div>
  );
};

export default memo(List);
