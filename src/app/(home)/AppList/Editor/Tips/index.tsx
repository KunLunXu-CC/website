import scss from './index.module.scss';

import { memo } from 'react';
import { APP_SETTING } from '@/config/constants';

const Tips = () => (
  <div
    id={APP_SETTING.EDITOR.code}
    className={scss.notification}
  />
);
export default memo(Tips);
