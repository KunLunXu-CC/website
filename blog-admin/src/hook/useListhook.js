import React, { useState, useEffect } from 'react';

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
  // /手动刷新
  output.refresh = () => {
    getList && getList({page, params, setList, setStats});
  }

  /**
   * @param {Number} rePage.page
   * @param {Number} rePage.pageSize
   */
  output.resetPage = (rePage = {}) => {
    rePage = {...page, ...rePage};
    setPage(rePage);
  }
  output.setParams = setParams;
  output.setStats = setStats;
  output.setList = setList;
  useEffect(output.refresh, [page, params]); 
  return output;
}
