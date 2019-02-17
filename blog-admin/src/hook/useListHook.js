import React, { useState, useEffect, useCallback } from 'react';

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
export const useListHook = ({ getList = null }) => {
  const [list, setList] = useState([]);
  const [params, setParams] = useState({});
  const [stats, setStats] = useState({total: 0});
  const [page, setPage] = useState({page: 1, pageSize: 10});

  // /手动刷新
  const refresh = useCallback(() => {
    getList && getList({page, params, setList, setStats});
  }, [page, params, setList, setStats]); 

  /**
   * @param {Number} rePage.page
   * @param {Number} rePage.pageSize
   */
  const resetPage = useCallback((rePage = {}) => {
    rePage = {...page, ...rePage};
    setPage(rePage);
  }, [page]);

  useEffect(refresh, [page, params]); 

  return {
    list, 
    stats,
    page, 
    params,
    setList,
    refresh,
    setStats,
    setParams,
    resetPage,
  };
}
