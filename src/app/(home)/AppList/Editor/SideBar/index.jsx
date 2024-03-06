import classNames from 'classnames';
import scss from './index.module.scss';

import { actions } from '@/store';
import { useMemo, useCallback } from 'react';
import { ACTIVITY_LIST } from '@/app/(home)/AppList/Editor/constants';
import { VariableContainer } from '@kunlunxu/brick';
import { useDispatch, useSelector } from 'react-redux';

const SIDE_MIN_WIDTH = 4;  // 菜单最小宽度

const SideBar =  () => {
  const dispatch = useDispatch();

  const { collapsed, activity } = useSelector((state) => ({
    collapsed: state.editor.side.collapsed,
    activity: state.editor.activity,
  }));

  // 顶层 className
  const className = useMemo(() => classNames(
    scss.side,
    { [scss.collapsed]: collapsed },
  ), [collapsed]);

  // 尺寸变化
  const onResize = useCallback(({ width }) => {
    dispatch(actions.editor.setSide({
      collapsed: SIDE_MIN_WIDTH === width,
    }));
  }, [dispatch]);

  const bodyEle = useMemo(() => {
    const { component: Body } = ACTIVITY_LIST.find(
      (v) => v.key === activity.selectKey,
    );
    return <Body />;
  }, [activity.selectKey]);

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
    </VariableContainer >
  );
};

export default SideBar;
