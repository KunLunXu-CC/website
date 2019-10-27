import _ from 'lodash';
import { observable, action, autorun, reaction, computed, toJS } from 'mobx';

export default class Store {
  constructor(parent){
    this.parent = parent;
  }

  // 当前展开的 SubMenu 菜单项 key 数组
  @observable openKeys = [];

  // SubMenu 展开/关闭的回调
  @action
  onOpenChange = (openKeys) => {
    if (!openKeys){return false;}
    _.isArray(openKeys) 
      ? this.openKeys = [...openKeys] 
      : this.openKeys = _.uniq([...this.openKeys, openKeys]);
  }

  // 菜单列表: 计算、处理 this.parent.tag.tags
  @computed get list() {
    const data = JSON.parse(JSON.stringify(this.parent.tag.tags));
    let parents = data.filter(v => !v.parent.id);
    let children = data.filter(v => !!v.parent.id);

    const translator = (parents, children) => {
      parents.forEach((parent) => {
        parent.children = [];
        children.forEach((current, index) => {
          parent.type = current.type = 'tag';
          if (current.parent.id === parent.id) {
            let temp = JSON.parse(JSON.stringify(children));
            temp.splice(index, 1);
            translator([current], temp);
            parent.children.push(current);
          }
        });
      });
    };
    translator(parents, children);

    console.log('===>>>>>>>>>>> menu list', parents);
    return parents;
  }
};
