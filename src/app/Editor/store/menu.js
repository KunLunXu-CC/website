import _ from 'lodash';
import { observable, action, autorun, reaction, computed, toJS } from 'mobx';

export default class Store {
  constructor(parent){
    this.parent = parent;
  }
  
  @computed get list() {
    let parents = this.parent.tag.tags.filter(v => !v.parent.id);
    let children = this.parent.tag.tags.filter(v => !!v.parent.id);

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
    return parents;
  }
};
