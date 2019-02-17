import React, { useState, useEffect, useCallback } from 'react';

/**
 * 模型自定义 hoot 
 * - isOpen     状态控制 modal 的开启和关闭
 * - data       开启 modal 时用于存储 modal 所需要的数据 (至于 data 内的数据结构则由用户自定义)
 * - openModal  内置开启弹窗的方法, 参数为要存在的data
 */
export const useModalHook = (init) => {
  const [isOpen, setIsOpen] = useState(false); 
  const [openEvents, setOpenEvents] = useState([]);
  const [closeEvents, setCloseEvents] = useState([]);
  const [data, setData] = useState(init || {});

  // 打开弹窗
  const openModal = useCallback((data) => {
    
    setData(data || init);
    setIsOpen(true);
  }, []);

  // 关闭弹窗
  const closeModal = useCallback(() => {
    setData(init || {});
    setIsOpen(false);
  }, []);

  // 添加打开弹窗的事件（回调函数）
  const onOpen = useCallback((cb) => {
    setOpenEvents([...openEvents, cb]);
  });

  // 添加关闭弹窗的事件（回调函数）
  const onClose = useCallback((cb) => {
    setCloseEvents([...closeEvents, cb]);
  });

  useEffect(() => {
    isOpen && openEvents.forEach(event => event(data || init));
    !isOpen && closeEvents.forEach(event => event(data || init)); 
  }, [isOpen]);

  return {
    data,
    isOpen,
    onOpen,
    onClose,
    openModal,
    closeModal,
  };
}
