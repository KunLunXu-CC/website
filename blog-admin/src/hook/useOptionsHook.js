import { Select } from 'antd';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { getOptions } from '@server';
const Option = Select.Option;

/**
 * 获取 options
 */
export const useOptionsHook = ({ model }) => {
  const [stats, setStats] = useState({ total: 0, totalPage: 1 });
  const [page, setPage] = useState({ page: 1, pageSize: 10 });
  const [params, setParams] = useState({ ids:[], name: '' });
  const [options, setOptions] = useState([]);
  const [list, setList] = useState([]);

  // 获取 options
  const getData = useCallback(() => {
    getOptions({ model, page, params }).then(res => {
      setList(res.list);
      setStats(res.stats);
    });
  });

  // 初始化 params
  const init = useCallback(() => {
    setPage({ page: 1, pageSize: 10 });
    setParams({ ids: [], name: ''});
  }, []);

  // 重置 params
  const resetParams = (reParams) => {
    console.log('=============================================================');
    console.log(params);
    setParams({...params, ...reParams});
    setPage({ page: 1, pageSize: page.pageSize });
  };

  // 重置 page (只对 page 进行修改， 不对pageSize 进行修改)
  const resetPage = useCallback(({ page: rePage }) => {
    setPage({ page: rePage });
  }, []);

  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {
    setOptions(list.map(v => (<Option key={v.id} value={v.id}>{v.name}</Option>)));
  }, [list]);

  return {
    init,
    options,
    resetPage,
    resetParams,
  };
}
