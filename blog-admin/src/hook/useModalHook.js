import React, { useState, useEffect } from 'react';

/**
 * 模型自定义 hoot 
 * - isOpen     状态控制 modal 的开启和关闭
 * - data       开启 modal 时用于存储 modal 所需要的数据
 * - openModal  内置开启弹窗的方法, 参数为要存在的data
 */
export const useModalHook = (init) => {
  const [isOpen, setIsOpen] = useState(false); 
  const [data, setData] = useState(init || {});
  const output = { isOpen, data };
  output.openModal = (data) => {
    setData(data || init);
    setIsOpen(true);
  }

  output.closeModal = () => {
    setData(init || {});
    setIsOpen(false);
  }
  
  return output;
}
