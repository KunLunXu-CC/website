import scss from './index.module.scss';

import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { APP_SETTING } from '@config/constants';

export default () => {
  const show = useSelector(
    (state) => state.spin?.[APP_SETTING.EDITOR.code],
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
        : null}
      <div
        id={APP_SETTING.EDITOR.code}
        className={scss.notification}
      />
    </>
  );
};
