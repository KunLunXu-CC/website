import scss from './index.module.scss';

import { Icon } from '@kunlunxu/brick';
import { Input } from 'antd';

export default () => (
  <div className={scss.header}>
    <Input
      size="large"
      placeholder="查询"
      prefix={<Icon type="icon-search" />}
    />
  </div>
);
