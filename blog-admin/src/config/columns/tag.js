export const tagColumnModel = [{
  title: '标签名称',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '所属标签',
  dataIndex: 'parent.name',
  key: 'parent.name',
}, {
  title: '标签颜色',
  dataIndex: 'color',
  key: 'color',
}, {
  title: '标签图标',
  key: 'icon',
  dataIndex: 'icon',
  
}, {
  title: '修改时间',
  type: 'Date',
  dataIndex: 'updateTime',
  key: 'updateTime',
}, {
  title: '标签状态',
  type: 'Status',
  dataIndex: 'status',
  desc: {0: '停用', 1: '启用'},
  key: 'status',
}];
