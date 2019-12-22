import { observable, action, computed } from 'mobx';

export default class Store {
  constructor (parent) {
    this.parent = parent;
  }

  // 当前展开的 SubMenu 菜单项 key 数组
  @observable openKeys = [];

  @observable selected = null;  // 当前选中 key

  // 选择子项
  @action
  toggleSelected = key => {
    if (this.selected === key){
      const last = _.last(this.parent.article.openList) || { article: null };
      this.selected = last.article;
    } else {
      this.selected = key;
    }
  }

  // SubMenu 展开/关闭的回调
  @action
  onOpenChange = openKeys => {
    if (!openKeys) {
      return false;
    }
    _.isArray(openKeys)
      ? this.openKeys = [... openKeys]
      : this.openKeys = _.uniq([... this.openKeys, openKeys]);
  }

  // 菜单列表: 计算、处理 this.parent.tag.tags、this.parent.article.articles
  @computed get list () {
    const tags = _.cloneDeep(this.parent.tag.tags).map(v => ({
      ... v,
      type: 'tag',
    }));
    const articles = _.cloneDeep(this.parent.article.articles).map(v => ({
      ... v,
      type: 'article',
    }));
    const parents = tags.filter(v => !v.parent.id);
    const children = tags.filter(v => !!v.parent.id);

    const translator = (parents, children) => {
      parents.forEach(parent => {
        // eslint-disable-next-line no-param-reassign
        parent.children = [];
        children.forEach((current, index) => {
          if (current.parent.id === parent.id) {
            const temp = JSON.parse(JSON.stringify(children));
            temp.splice(index, 1);
            translator([current], temp);
            parent.children.push(current);
          }
        });
        // 挂载当前目录下所有文章: 默认按照第一个 tag 为准
        parent.children.push(... articles.filter(
          article => (_.get(article, 'tags[0].id') === parent.id)
        ));
      });
    };
    translator(parents, children);
    return parents;
  }
}
