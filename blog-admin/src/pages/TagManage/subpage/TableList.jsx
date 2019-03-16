import _ from 'lodash';
import { Card, Table, Popconfirm } from 'antd';
import { removeTagByIds } from '@server';
import { OPERATING_TYPE } from '@config/conts';
import { Spin, FontIcon } from '@components';
import handler, { tagColumnModel } from '@config/columns';
import React, { Fragment } from 'react';

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
      type: OPERATING_TYPE.EDIT.VALUE,
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
      type: OPERATING_TYPE.CREATE.VALUE, 
    });
  };

  // table columns
  const columns = handler(tagColumnModel)([{
    title: '操作',
    key: 'operate',
    dataIndex: 'operate',
    render: (text, record, index) => (
      <Fragment>
        <FontIcon
          icon="#icon-editor"
          className="cp f22 mrm linkp"
          onClick={onEdit.bind(null, record)}
        />
        <Popconfirm 
          okText="确定" 
          cancelText="取消"
          title="确定要删除该条记录?" 
          onConfirm={onDelete.bind(null, record)} 
        >
          <FontIcon icon="#icon-shanchu" className="cp f22 linkd" />
        </Popconfirm>
      </Fragment>
    )
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
