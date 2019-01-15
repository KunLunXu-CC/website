import { observable, action, autorun } from 'mobx';

const mock = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  }, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  }
];

class Tag {
  constructor(){
    this.bindAutorun();
  }

  @observable modal = {
    type: null,       // 弹窗类型： create（新增） modify（修改）
    data: null,       // 弹窗数据
  };

  @observable page = {
    current: 1,       // 分页状态 - 当前页
    pageSize: 10,     // 分页状态 - 每页显示条数 
  }

  @observable data = {
    list: mock,
    length: 1000
  };

  @action clearStore = () => {
    this.modal = { type: null, data: null };
    this.page = { current: 1, pageSize: 0 };
  }

  @action openModal = (type, data) => {
    this.modal = {
      type,
      data: data || null
    };
  }

  @action clearModel = () => {
    this.modal = { type: null, data: null };
  }

  @action setPage = (current, pageSize) => {
    console.log(current, pageSize);
    this.page = {
      current: current || this.page.current,
      pageSize: pageSize || this.page.pageSize
    };
  }

  bindAutorun = () => {
    // 默认执行一次 后每次修改都会执行
    autorun(() => {
      console.log('打印页数');
      console.log(this.page);
    });
  }

}

export default Tag;
