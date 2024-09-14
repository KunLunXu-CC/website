import { memo } from 'react';
import scss from './index.module.scss';

const Header = () => <div className={scss.header} />;

export default memo(Header);
