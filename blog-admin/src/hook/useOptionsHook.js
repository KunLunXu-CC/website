import { Select } from 'antd';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { getOptions } from '@server';
const Option = Select.Option;

/**
 * 获取 options
 * - stats    请求查询返回的统计数据
 * - page     请求参数（page{page: 获取多少页数据， pageSize: 每次每页请求个数}）
 * - params   请求参数
 * - list     请求返回的列表
 * @param {String} model 要获取 options 的模型
 */
export const useOptionsHook = ({ model }) => {
  const [stats, setStats] = useState({ total: 0, totalPage: 1 });
  const [page, setPage] = useState({ page: 1, pageSize: 10 });
  const [params, setParams] = useState({ ids:[], name: '' });
  const [list, setList] = useState([]);

  /**
   * 内置请求数据函数
   */
  const getData = useCallback(() => {
    getOptions({ model, page, params }).then(res => {
      setList(res.list);
      setStats(res.stats);
    });
  });

  /**
   * 初始化 store： 初始化请求参数（params page） 
   */
  const init = useCallback(() => {
    setPage({ page: 1, pageSize: 10 });
    setParams({ ids: [], name: ''});
  }, []);

  /**
   * 重设params
   * @param {Object} value 需要重新设置的字段
   */
  const resetParams = useCallback((value) => {
    setParams({...params, ...value});
    setPage({ page: 1, pageSize: page.pageSize });
  }, [params, page]);

  /**
   * 重设 page: 只对 page 进行修改， 不对pageSize 进行修改
   * @param {Number} value 要请求多少页的数据
   */
  const resetPage = useCallback((value) => {
    setPage({ ...page, page: value });
  }, [page]);


  // 监听 list 的变化计算 options
  const options = useMemo(
    () => list.map(v => (<Option key={v.id} value={v.id}>{v.name}</Option>)), 
    [list]
  );

  // 监听 page 的变化
  useEffect(() => {
    getData();
  }, [page]);

  return {
    init,
    options,
    resetPage,
    resetParams,
  };
}
