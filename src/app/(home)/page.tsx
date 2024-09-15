/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import AppList from './AppList';
import Desktop from './Desktop';
import DockList from './DockList';
import MenuList from './MenuList';
import useAppStore from '@/store/useAppStore';
import useUserStore from '@/store/useUserStore';
import usePhotosStore from '@/store/usePhotosStore';

import { useEffect } from 'react';
import { useFragment } from '@/gql';
import { useUserInfoQuery } from '@/server/user';
import { usePhotosQuery } from '@/server/photos';
import { Photo, UserItemFragmentDoc } from '@/gql/graphql';

/**
 * 下面所有组件都使用 position: fixed 进行布局
 * MenuList 和 DockList z-index = 1
 * Desktop z-index = -1
 * AppList z-index = 0（默认）
 *
 * @returns {any} 元素节点
 */
const Home = () => {
  const { setUser } = useUserStore();
  const { initAppStore } = useAppStore();

  const { initPhotosStore } = usePhotosStore();

  const { data: photosQueryData } = usePhotosQuery({});
  const { data: userInfoQueryData } = useUserInfoQuery();

  useEffect(() => {
    const user = useFragment(UserItemFragmentDoc, userInfoQueryData?.userInfo?.user);

    if (user) {
      setUser(user);
      initAppStore(user);
    } else {
    }
  }, [initAppStore, setUser, userInfoQueryData]);

  useEffect(() => {
    if (photosQueryData?.photos) {
      initPhotosStore(photosQueryData.photos.list as Photo[]);
    }
  }, [initPhotosStore, photosQueryData]);

  return (
    <>
      <AppList />
      <MenuList />
      <DockList />
      <Desktop />
    </>
  );
};

export default Home;
