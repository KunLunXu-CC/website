import React, { useState, useEffect, useCallback } from 'react';

/**
 * 模型自定义 hoot
 * @param {Object}  初始化 data 值
 * - isOpen       弹窗是否开启， 控制弹窗的状态控制弹窗的显示隐藏等
 * - data         开启弹窗时用于存储弹窗所需要的部分数据 ( 至于 data 内的数据结构则由用户自定义， 但是推荐 data 的结构从始至终都应该一致)
 * - openEvents   开启弹窗的事件列表， 在开启弹窗时将会依次执行所有事件
 * - closeEvents  关闭弹窗的事件列表， 在关闭弹窗时将会依次执行所有事件
 * - openModal    开启弹窗： openModal（data）
 * - closeModal   关闭弹窗： closeModal()
 * - onOpen       添加开启弹窗事件， 在开启弹窗时将执行 openEvents 事件列表： function(data || init){} data 为开启弹窗时传入的数据
 * - onClose      添加关闭弹窗事件， 在弹窗关闭时将执行 closeEvents 事件列表： unction(data || init){} data 为关闭弹窗前的数据
 */
export const useModalHook = (init = {}) => {
  const [isOpen, setIsOpen] = useState(false); 
  const [data, setData] = useState(init);
  const [openEvents, setOpenEvents] = useState([]);
  const [closeEvents, setCloseEvents] = useState([]);

  /**
   * 打开弹窗
   * @param {Object}  data  开启弹窗时要存储的数据 
   */
  const openModal = useCallback((value) => {
    const change = {...data, ...value};
    openEvents.forEach(event => event(change));    
    setData(change);
    setIsOpen(true);
  }, [openEvents, data]);

  /**
   * 关闭弹窗
   */
  const closeModal = useCallback(() => {
    closeEvents.forEach(event => event(data));
    setData(init);
    setIsOpen(false);
  }, [closeEvents, data]);

  /**
   * 添加打开弹窗的事件（回调函数）
   * @param {Function}  cb   要添加的事件函数
   */
  const onOpen = useCallback((cb) => {
    setOpenEvents([...openEvents, cb]);
  }, [openEvents]);


   /**
   * 添加关闭弹窗的事件（回调函数）
   * @param {Function}  cb   要添加的事件函数
   */
  const onClose = useCallback((cb) => {
    setCloseEvents([...closeEvents, cb]);
  }, [closeEvents]);

  return {
    data,
    isOpen,
    onOpen,
    onClose,
    openModal,
    closeModal,
  };
}
