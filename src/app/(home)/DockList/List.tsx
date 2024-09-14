import classNames from 'classnames';
import scss from './list.module.scss';
import styled from 'styled-components';
import apps from '@/app/(home)/AppList/config';
import useSettingStore from '@/store/useSettingStore';

import { isNumber } from 'lodash';
import { Image } from '@nextui-org/react';
import { APP_CODE } from '@/config/constants';
import { useState, useMemo, memo, FC } from 'react';

const DockApp = styled.div<{ index: number; currentIndex?: number }>`
  --scale: ${({ index, currentIndex }) => {
    const defaultValue = 1;

    if (!isNumber(currentIndex)) {
      return defaultValue;
    }

    const mapIndex = 2 - Math.abs(currentIndex - index);
    return [1.1, 1.2, 1.3]?.[mapIndex] || defaultValue;
  }};
`;

interface IListProps {
  dataSource: any[];
  onClick: (dock: any) => void;
}

const List: FC<IListProps> = (props) => {
  const { dataSource, onClick } = props;
  const [currentIndex, setCurrentIndex] = useState<number>();
  const { dock } = useSettingStore();

  // 最外层容器 className
  const className = useMemo(
    () => classNames(scss.dock, { [scss['dock-auto-hiding']]: dock.hideDock }),
    [dock.hideDock],
  );

  return (
    <div className={className}>
      <div className={scss['dock-body']}>
        {dataSource.map((v, index) => (
          <DockApp
            index={index}
            key={v.code || index}
            className={scss['dock-app']}
            currentIndex={currentIndex}
            onClick={onClick.bind(null, v)}
            onMouseLeave={setCurrentIndex.bind(null, void 0)}
            onMouseEnter={setCurrentIndex.bind(null, index)}>
            <div className={scss['dock-tooltip']}>{apps[v.code as APP_CODE].name}</div>
            <Image
              className={scss['dock-icon']}
              src={apps[v.code as APP_CODE].icon}
              alt={apps[v.code as APP_CODE].name}
            />
          </DockApp>
        ))}
      </div>
    </div>
  );
};

export default memo(List);
