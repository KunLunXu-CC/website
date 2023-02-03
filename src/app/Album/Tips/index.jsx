import scss from './index.module.scss';

import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { APP_CODE } from '@config/consts';

export default () => {
  const show = useSelector(
    (state) => state.spin?.[APP_CODE.ALBUM],
  );
  return (
    <>
      {show
        ? (
          <Spin
            className={scss.spin}
            size="large"
          />
        )
        : null
      }
      <div
        id={APP_CODE.ALBUM}
        className={scss.notification}
      />
    </>
  );
};
