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

/**
 * 通用列表 hook
 * @param {Function} getList    查询方法, function({page, params, setList, setTotal}){}
 * - list             列表数据
 * - stats            统计
 * - page             查询参数 - page
 * - stats            设置统计数据
 * - params           查询条件
 * - getListInternal  内置查询方法, 调用 getList
 */
export const useListhook = ({ getList = null }) => {
  const [list, setList] = useState([]);
  const [stats, setStats] = useState({total: 0});
  const [page, setPage] = useState({page: 1, pageSize: 10});
  const [params, setParams] = useState({});
  const output = { list, stats, page, params };
  output.refresh = () => {
    getList && getList({page, params, setList, setStats});
  }
  output.setPage = setPage;
  output.setParams = setParams;
  output.setStats = setStats;
  output.setList = setList;
  useEffect(output.refresh, [page, params]); 
  return output;
}
