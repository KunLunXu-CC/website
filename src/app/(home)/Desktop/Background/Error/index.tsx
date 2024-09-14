import { memo } from 'react';
import scss from './index.module.scss';

const Error = () => <div className={scss.error}>1</div>;

export default memo(Error);
