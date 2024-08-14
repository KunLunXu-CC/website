"use client";
import AppList from "./AppList";
import Desktop from "./Desktop";
import DockList from "./DockList";
import MenuList from "./MenuList";
import useAppStore from "@/store/useAppStore";
import useUserStore from "@/store/useUserStore";
import useSettingStore from "@/store/useSettingStore";

import { actions } from "@/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useUserInfoQuery } from "@/server/user";
import { useGetPhotosQuery } from "@/store/graphql";

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
  const { initSettingStore } = useSettingStore();
  const { data: userInfoQueryData } = useUserInfoQuery();

  const dispatch = useDispatch();

  const { data: photosData } = useGetPhotosQuery();

  useEffect(() => {
    const { user } = userInfoQueryData?.userInfo ?? {};
    if (user) {
      setUser(user);
      initAppStore(user);
    } else {
    }
  }, [initAppStore, setUser, userInfoQueryData]);

  useEffect(() => {
    dispatch(actions.photos.init(photosData?.photos?.list));
  }, [photosData, dispatch]);

  useEffect(() => {
    initSettingStore();
  }, [initSettingStore]);

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
