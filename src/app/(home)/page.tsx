"use client";
import AppList from "./AppList";
import Desktop from "./Desktop";
import DockList from "./DockList";
import MenuList from "./MenuList";
import { actions } from "@/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetPhotosQuery, useGetUserInfoQuery } from "@/store/graphql";
import { usePathname } from "next/navigation";

/**
 * 下面所有组件都使用 position: fixed 进行布局
 * MenuList 和 DockList z-index = 1
 * Desktop z-index = -1
 * AppList z-index = 0（默认）
 *
 * @returns {any} 元素节点
 */
const Home = () => {
  const { data: userInfo } = useGetUserInfoQuery();
  const dispatch = useDispatch();
  const pathname = usePathname();

  const { data: photosData } = useGetPhotosQuery();

  useEffect(() => {
    const { user } = userInfo?.userInfo ?? {};
    if (user) {
      dispatch(actions.user.set(user));
      dispatch(actions.app.init(user));
    }
  }, [dispatch, userInfo]);

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

export default Home;
