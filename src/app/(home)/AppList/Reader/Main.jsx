import { memo } from 'react';
import scss from './index.module.scss';

const Reader = () => (
  <div className={scss.reader} />
);

export default memo(Reader);
