import React, {
  useMemo,
} from 'react';
import moment from 'moment';
import scss from './index.module.scss';

import { Image, Icon } from 'qyrc';
import { PHOTO_TYPE } from '@config/consts';

const useStateHook = props => {
  // 计算描述信息
  const desc = useMemo(() => {
    const { type } = props.data;
    const desc = _.find(PHOTO_TYPE, v => v.VALUE === type);
    return desc && desc.DESC;
  }, [props.data]);

  // 删除
  const onDelete = () => {
    _.isFunction(props.onDelete) && props.onDelete(props.data);
  };

  return { desc, onDelete };
};

// "https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.6/img/other/th%20(3).jpg"
export default props => {
  const state = useStateHook(props);

  return (
    <div className={scss.item}>
      <div className={scss.preview}>
        <div className={scss['preview-body']}>
          <Image src={props.data.url}/>
        </div>
        <div className={scss['preview-mask']}>
          <Icon type="icon-shanchu" onClick={state.onDelete}/>
        </div>
      </div>
      <div className={scss.info}>
        <div className={scss['info-icon']}>
          <Icon type="icon-genghuanfengmian" />
        </div>
        <div className={scss['info-body']}>
          <div className={scss['info-body-desc']}>
            {state.desc}
          </div>
          <div className={scss['info-body-time']}>
            {moment(props.data.creationTime).format('YYYY / MM / DD')}
          </div>
        </div>
      </div>
    </div>
  );
};
