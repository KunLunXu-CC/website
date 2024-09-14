import Move from './Move';
import scss from './index.module.scss';
import { memo } from 'react';

const Modals = () => (
  <div className={scss.modals}>
    <Move />
  </div>
);

export default memo(Modals);
