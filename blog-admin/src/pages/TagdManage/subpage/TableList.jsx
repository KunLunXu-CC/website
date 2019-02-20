import _ from 'lodash';
import { Card, Table } from 'antd';
import { removeTagByIds } from '@server';
import { OPERATING_TYPE } from '@config/conts';
import { Spin, FontIcon, IconBtn } from '@components';
import handler, { tagColumnModel } from '@config/columns';
import React, { useEffect, useMemo } from 'react';

export default ({listStore, modalStore}) => {
  // 分页器 onChange 事件
  const onChange = (page = 1, pageSize = 10) => {
    listStore.resetPage({ page, pageSize });
  };

  // 编辑(打开弹窗)
  const onEdit = (record) => {
    modalStore.openModal({
      title: '修改标签',
      current: record ||  {},
      type: OPERATING_TYPE.EDIT.value,
    });
  };

  // 删除
  const onDelete = (record) => {
    listStore.resetPage({ page: 1 });
    removeTagByIds({id: record.id});
  };

  // 创建(打开弹窗)
  const createTag = () => {
    modalStore.openModal({
      current: null,
      title: '新增标签', 
      type: OPERATING_TYPE.CREATE.value, 
    });
  };

  // table columns
  const columns = handler(tagColumnModel)([{
    title: '操作',
    key: 'operate',
    dataIndex: 'operate',
    render: (text, record, index) => ([
      <IconBtn 
        className="mlrn"
        key={OPERATING_TYPE.EDIT.value} 
        type={OPERATING_TYPE.EDIT.value}
        onClick={onEdit.bind(null, record)}/>,
      <IconBtn
        className="mlrn"
        key={OPERATING_TYPE.DELETE.value} 
        type={OPERATING_TYPE.DELETE.value} 
        onClick={onDelete.bind(null, record)}/>,
    ])
  }]);

  // 新增按钮
  const extra = (
    <FontIcon
      onClick={createTag}
      icon="#icon-xinzeng"
      className="cp f22 linkp"
    />
  );

  return (
    <Spin>
      <Card title="列表数据" className="block_second" extra={ extra } >
        <Table 
          columns={columns} 
          dataSource={listStore.list}
          rowKey={(record, index) => (record.id || index)}
          pagination={{
            onChange: onChange,
            showQuickJumper: true,
            total: listStore.stats.total,
            current: listStore.page.page,
            pageSize: listStore.page.pageSize,
            showTotal: (total, range) => `当前 ${range[0]} - ${range[1]} 页 总计 ${total} 页`,
          }} 
        />
      </Card>
    </Spin>
  );
}
