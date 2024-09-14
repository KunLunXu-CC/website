import { memo } from 'react';
import scss from './index.module.scss';

const Loading = () => <div className={scss.loading} />;

export default memo(Loading);
