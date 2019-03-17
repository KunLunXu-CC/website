import './index.scss';
import { getTagList } from '@server';
import React, {  Fragment } from 'react';
import TableList from './subpage/TableList';
import QueryBlock from './subpage/QueryBlock';
import { useListHook, useModalHook } from '@hook';
import CreateAndModify from './subpage/CreateAndModify';

// 查询数据方法
const getList = ({ params, setData }) => {
  const { page, conds } = params;
  getTagList({ page, params: conds }).then(({ list, stats }) => {
    setData({ list, stats });
  })
}

const useStateHook = () => {
  const stateHook = {};
  stateHook.listHook = useListHook({getList});
  stateHook.modalHook = useModalHook({ type: '', title: '', current: null });
  return stateHook;
}

export default (props) => {
  const { listHook, modalHook } = useStateHook(props);
  return (
    <Fragment>
      <QueryBlock listHook={listHook} />
      <TableList 
        listHook={listHook} 
        modalHook={modalHook} 
      />
      <CreateAndModify 
        listHook={listHook} 
        modalHook={modalHook} 
      />
    </Fragment>
  );
}
