import _ from 'lodash';
import { notification } from 'antd';
import { observable, action, reaction } from 'mobx';

export default class Message {
  constructor (parent) {
    this.parent = parent;
    _.forIn(this.reactionList, v => reaction(v.data, v.effect));
  }

  @observable message = {
    duration: 2,
    message: null,
    type: 'success',
    description: null,
  };

  @observable container = null;

  // 设置提示信息
  @action
  setMessage = message => {
    this.message = {
      ... this.message,
      ... message,
      getContainer: () => (this.container),
    };
  }

  // 设置容器
  @action
  setContainer = container => {
    this.container = container;
  }

  // 反应列表
  reactionList = {
    // 显示提示信息
    showMessage: {
      data: () => {
        const { type, ... config } = this.message;
        return { type, config };
      },
      effect: ({ config, type }) => (notification[type] && notification[type](config)),
    },
  };
}
