import React, { useState } from 'react';
import './index.scss';
import QueryBlock from './subpage/QueryBlock';
import TableList from './subpage/TableList';
import CreateAndModify from './subpage/CreateAndModify';

const pageStore = () => {
  const [list, setList] = useState([{},{}]);
  const [total, setTotal] = useState(2);
  const [page, setPage] = useState({current: 1, pageSize: 10});
  const [params, setParams] = useState({});
  return {list, total, page, params, setList, setTotal, setPage, setParams};
}

export default () => {
  const store = pageStore();
  return (
    <div>
      <QueryBlock 
        store={store}
      />
      <TableList  
        store={store}
      />
      <CreateAndModify 
        store={store}
      />
    </div>
  );
}
