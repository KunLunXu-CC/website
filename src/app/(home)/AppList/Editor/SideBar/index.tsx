import classNames from 'classnames';
import scss from './index.module.scss';
import useInitArticles from '../hooks/useInitResource';
import useActivityBarStore from '../hooks/useActivityBarStore';

import { useMemo, useCallback, memo } from 'react';
import { VariableContainer } from '@kunlunxu/brick';
import { ACTIVITY_BAR_LIST } from '@/app/(home)/AppList/Editor/constants';

const SIDE_MIN_WIDTH = 4; // 菜单最小宽度

const SideBar = () => {
  const { isSideBarCollapsed, selectedActivityBarKey, setIsSideBarCollapsed } = useActivityBarStore();

  // 顶层 className
  const className = useMemo(
    () => classNames(scss.side, { [scss.collapsed]: isSideBarCollapsed }),
    [isSideBarCollapsed],
  );

  // 尺寸变化
  const onResize = useCallback(
    ({ width }: { width: number }) => {
      setIsSideBarCollapsed(SIDE_MIN_WIDTH === width);
    },
    [setIsSideBarCollapsed],
  );

  const bodyEle = useMemo(() => {
    const { sideBar: Body } = ACTIVITY_BAR_LIST.find((v) => v.key === selectedActivityBarKey)!;
    return <Body />;
  }, [selectedActivityBarKey]);
  useInitArticles();

  return (
    <VariableContainer
      layout
      onResize={onResize}
      className={className}
      margin={{ right: '20%' }}
      operationList={['right']}
      style={{ height: '100%' }}
      constraintSize={{ width: SIDE_MIN_WIDTH }}>
      {bodyEle}
    </VariableContainer>
  );
};

export default memo(SideBar);
