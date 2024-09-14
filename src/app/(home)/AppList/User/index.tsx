import { memo } from 'react';
import scss from './index.module.scss';

const User = () => (
  <div className={scss.user}>
    <div>11</div>
  </div>
);

export default memo(User);
