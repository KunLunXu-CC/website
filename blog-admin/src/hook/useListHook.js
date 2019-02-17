import React, { useState, useEffect, useCallback } from 'react';

/**
 * 通用列表 hook
 * @param {Function} getList    查询方法, function({page, params, setList, setStats}){ }
 * - list             获取到的数据列表
 * - stats            查询数据时返回的统计信息
 * - params           查询参数（查询条件）
 * - page             查询参数（page）
 */
export const useListHook = ({ getList = null }) => {
  const [list, setList] = useState([]);
  const [params, setParams] = useState({});
  const [stats, setStats] = useState({ total: 0 });
  const [page, setPage] = useState({page: 1, pageSize: 10});

  // 刷新：重新获取数据
  const refresh = useCallback(() => {
    getList && getList({ page, params, setList, setStats });
  }, [page, params, setList, setStats]); 

  /**
   * 重新设置查询参数（page）
   * @param {Object} value  要设置的查询参数
   */
  const resetParams = useCallback(( value = {} ) => {
    setParams({ ...params, ...value });
  }, [params]);

  /**
   * 重新设置查询参数（page）
   * @param {Number} value.page
   * @param {Number} value.pageSize
   */
  const resetPage = useCallback((value = {}) => {
    setPage({...page, ...value});
  }, [page]);

  useEffect(refresh, [page, params]);

  return {
    list, 
    stats,
    page, 
    params,
    refresh,
    resetParams,
    resetPage,
  };
}
