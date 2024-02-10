'use client'
import AppList from './AppList';
import Desktop from './Desktop';
import DockList from './DockList';
import MenuList from './MenuList';
import { actions } from '@/store';
import { useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { useLoginMutation, LoginMutation, useGetPhotosQuery } from '@/store/graphql';

/**
 * 下面所有组件都使用 position: fixed 进行布局
 * MenuList 和 DockList z-index = 1
 * Desktop z-index = -1
 * AppList z-index = 0（默认）
 *
 * @returns {any} 元素节点
 */
export default () => {
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const { data: photosData } = useGetPhotosQuery();

  // 登录获取用户信息
  const initUserInfo = useCallback(async () => {
    const { data } = await login() as { data: LoginMutation; };
    const { user } = data.login ?? {};
    dispatch(actions.user.set(user));

    dispatch(actions.app.init(user));
  }, [login, dispatch]);

  useEffect(() => {
    initUserInfo();
  }, [initUserInfo]);

  useEffect(() => {
    dispatch(actions.photos.init(photosData?.photos?.list));
  }, [photosData, dispatch]);


  useEffect(() => {
    dispatch(actions.setting.init());
  }, [dispatch]);

  return (
    <>
      <AppList />
      <MenuList />
      <DockList />
      <Desktop />
    </>
  );
};
