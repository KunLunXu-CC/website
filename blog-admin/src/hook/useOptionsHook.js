import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useLoggerHook } from './useUtilsHook';
import * as CONTS from '@config/conts';
import { getOptions } from '@server';
import { Select } from 'antd';
import _ from 'lodash';

const Option = Select.Option;

// hook 状态初始值
const initValue = { 
  params: {
    page: { page: 1, pageSize: 10 },
    conds: { filter: [], ids: [], name: '' },
  },
  data: {
    list: [], 
    stats: {total: 0, totalPage: 1},
  }
};

/**
 * 将常量映射为 data.list
 * @param {String} conts 常量名称
 * @return {Array} [{id, name}]
 */
export const contsMapToList = (conts) => {
  const list = [];
  CONTS[conts] && _.forIn(CONTS[conts], (value, key) => {
    list.push({ id: value.VALUE, name: value.DESC });
  });
  return list;
};

/**
 * 下拉项 options hook
 * @param {String} model 要获取 options 的模型名称
 * @param {String} conts 要获取 options 的常量名称
 * @returns {Object}
 * - init         初始化（初始化请求参数为默认参数）
 * - options      返回 antd Select 下拉项
 * - resetParams  重设请求参数
 */
export const useOptionsHook = ({ model, conts }) => {
  const [params, setParams] = useState(initValue.params);
  const [data, setData] = useState(initValue.data)

  // 日志打印
  useLoggerHook({name: 'options', listenter: {params, data} });

  useEffect(() => {
    getData();
  }, [params]);

  // 初始化数据（初始化请求参数）
  const init = useCallback(() => {
    setParams(initValue.params);
  }, []);

  /**
   * 重设 params
   * @param {Object} conds 查询条件
   * @param {Object} page  查询页数
   */
  const resetParams = useCallback(({ conds, page }) => {
    setParams({ 
      conds: {...params.conds, ...conds},
      page: {...params.page, ...page}
    });
  }, [params]);

  // 请求数据
  const getData = useCallback(() => {
    // 1. 如果传入常量名称，则根据常量映射出数据
    conts && setData({ 
      list: contsMapToList(conts),
      stats: initValue.stats 
    });
    // 2. 如果传入了模型名称，则调用通用查询方法获取数据
    model && getOptions({ 
      model, 
      page: params.page,
      params: params.conds  
    }).then(({ list, stats }) => {
      setData({ list, stats });
    });
  }, [params]);

  // 计算 list 并返回 antd select 组件 children
  const options = useMemo(() => {
    return data.list.map(v => (<Option key={v.id} value={v.id}>{v.name}</Option>));
  }, [data.list]);

  return {
    init,
    options,
    resetParams,
  };
}
