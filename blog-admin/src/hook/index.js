import React, { useState, useEffect } from 'react';

/**
 * 模型自定义 hoot 
 * - isOpen     状态控制 modal 的开启和关闭
 * - data       开启 modal 时用于存储 modal 所需要的数据
 * - openModal  内置开启弹窗的方法, 参数为要存在的data
 */
export const useModalHook = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const [data, setData] = useState({});
  const openModal = (data = {}) => {
    setData(data);
    setIsOpen(true);
  }
  const closeModal = () => {
    setData({});
    setIsOpen(false);
  }
  return { isOpen, data, openModal, closeModal};
}

/**
 * 通用列表 hook
 * @param {Function} getList    查询方法, function({page, params, setList, setTotal}){}
 * - list             列表数据
 * - stats            统计
 * - page             查询参数 - page
 * - params           查询条件
 * - getListInternal  内置查询方法, 调用 getList
 */
export const useListhook = ({ getList = null }) => {
  const [list, setList] = useState([]);
  const [stats, setStats] = useState({total: 0});
  const [page, setPage] = useState({page: 1, pageSize: 10});
  const [params, setParams] = useState({});
  const getListInternal = () => {
    getList && getList({page, params, setList, setStats});
  }
  useEffect(getListInternal, [page, params]); 
  return {
    getList: getListInternal,
    list, page, stats, params, 
    setList, setPage, setParams, setStats,
  };
}
