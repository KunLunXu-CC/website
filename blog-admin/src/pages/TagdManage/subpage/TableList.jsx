import React from 'react';
import _ from 'lodash';
import columns from '../../../config/columns/tag';
import { Card, Table } from 'antd';

export default (props) => {
  const store = props.store;
  const onPaginationChange = (page = 1, pageSize = 10) => {
    this.props.tag.setPage(page, pageSize);
  }

  return (
    <div className="ptbw">
      <Card>
        <Table 
          columns={columns} 
          dataSource={store.list}
          pagination={{
            total: store.total,
            onChange: onPaginationChange,
            pageSize: store.page.pageSize,
            current: store.page.current,
          }} 
        />
      </Card>
    </div>
  );
}
