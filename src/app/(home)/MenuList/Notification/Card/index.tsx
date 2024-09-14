import classNames from 'classnames';
import scss from './index.module.scss';
import { FC, memo, ReactNode } from 'react';

const DEFAULT_SIZE = 'middle'; // 默认尺寸

interface ICardProps {
  className?: string;
  size?: 'large' | 'middle' | 'small';
  children: ReactNode;
}

// size: large | middle | small
const Card: FC<ICardProps> = (props) => (
  <div className={classNames(scss.card, props.className, props.size || DEFAULT_SIZE)}>{props.children}</div>
);

export default memo(Card);
