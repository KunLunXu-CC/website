import './index.scss';
import { getTagList } from '@server';
import React, {  Fragment } from 'react';
import TableList from './subpage/TableList';
import QueryBlock from './subpage/QueryBlock';
import { useListHook, useModalHook } from '@hook';
import CreateAndModify from './subpage/CreateAndModify';

// 查询数据方法
const getList = ({ page, params, setList, setStats }) => {
  getTagList({ page, params }).then(res => {
    setList(res.list);
    setStats(res.stats);
  })
}

export default () => {
  const listStore = useListHook({getList});
  const modalStore = useModalHook();

  return (
    <Fragment>
      <QueryBlock
        listStore={listStore}
        modalStore={modalStore}
      />
      <TableList  
        listStore={listStore}
        modalStore={modalStore}
      />
      <CreateAndModify 
        listStore={listStore}
        modalStore={modalStore}
      />
    </Fragment>
  );
}
