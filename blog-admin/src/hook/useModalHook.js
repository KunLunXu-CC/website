import React, { useState, useEffect, useCallback } from 'react';
import { useLoggerHook } from './useUtilsHook';

/**
 * 弹窗 hook
 * @param {Object}  初始 data 值
 * @returns {Object}
 * - data           开启弹窗时存储的数据 ( data 数据结构可自定义， 推荐 data 的结构从始至终保持一致)
 * - isOpen         弹窗是否开启， 控制弹窗的状态控制弹窗的显示隐藏等
 * - onOpen         添加开启弹窗事件
 * - onClose        添加关闭弹窗事件
 * - openModal      开启弹窗
 * - closeModal     关闭弹窗
 */
export const useModalHook = (init = {}) => {
  const [data, setData] = useState(init);
  const [isOpen, setIsOpen] = useState(false); 
  const [openEvents, setOpenEvents] = useState([]);
  const [closeEvents, setCloseEvents] = useState([]);

  // 日志打印
  useLoggerHook({name: 'modal', listenter: { data, isOpen }});

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

  // 关闭弹窗， data 重置为初始值
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
   * @param {Function}  cb  要添加的事件函数
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
