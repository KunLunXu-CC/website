import React, { useState, useEffect, useCallback } from 'react';

// 初始值
const initValue = {
  params: {
    conds: {},
    page: {page: 1, pageSize: 10},
  },
  data: {
    list: [],
    stats: { total: 0 },
  }
};

/**
 * 通用列表 hook
 * @param {Function} getList      查询方法, function({params, setData}){ }
 * @param {Object}   initParams   初始查询参数 { conds, page }
 * @returns {Object}
 * - data         查询到的数据 { list, stats }
 * - setConds     设置查询条件 
 * - setPage      设置查询页数
 * - getData      手动获取数据
 */
export const useListHook = ({ getList = null, initParams }) => {
  const [params, setParams] = useState({ ...initValue.params, ...initParams });
  const [data, setData] = useState(initValue.data);

  useEffect(() => { 
    getData();
   }, [params]);

  // 获取数据
  const getData = useCallback(() => {
    getList && getList({ params, setData });
  }, [params]); 


  /**
   * 设置查询条件
   * @param {Object} value  要设置的查询条件
   */
  const setConds = useCallback(( value = {} ) => {
    setParams({
      conds: { ...params.conds, ...value },
      page: { ...initValue.params.page },
    });
  }, [params]);

  /**
   * 重新设置查询页数
   * @param {Number} value.page
   * @param {Number} value.pageSize
   */
  const setPage = useCallback((value = {}) => {
    setParams({
      conds: { ...params.conds },
      page: { ...params.page, ...value },
    });
  }, [params]);

  return {
    data,
    params,
    setConds,
    setPage,
    getData,
  };
}
