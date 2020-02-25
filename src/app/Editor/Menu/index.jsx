import React, {
  useMemo,
  useEffect,
} from 'react';
import MenuTitle from './MenuTitle';
import scss from './index.module.scss';

import { Menu } from 'antd';
import { Icon, Scroll } from 'qyrc';
import { useDispatch, useSelector } from 'react-redux';

// 子菜单开启历史: 避免重复查询, 存储的是 key 值
const SUBMENU_OPEN_HISTORY = [];

const INLINE_INDENT = 14;  // 菜单缩进大小

const useStateHook = () => {
  const dispatch = useDispatch();

  const { tags, articles, menu, works } = useSelector(state => ({
    tags: _.get(state, 'editor.tags'),
    menu: _.get(state, 'editor.menu'),
    works: _.get(state, 'editor.works'),
    articles: _.get(state, 'editor.articles'),
  }));

  const selectedKeys = useMemo(() => (
    _.get(works.find(v => v.action), 'article')
  ), [works]);

  // 菜单列表: 计算、处理 tags、articles
  const list = useMemo(() => {
    const _tags = _.sortBy(
      _.cloneDeep(tags).map(v => ({
        ... v,
        type: 'tag',
      })),
      ele => ele.name
    );

    const _articles = _.sortBy(
      _.cloneDeep(articles).map(v => ({
        ... v,
        type: 'article',
      })),
      ele => ele.name
    );

    const parents = _tags.filter(v => !v.parent.id);
    const children = _tags.filter(v => !!v.parent.id);

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
        parent.children.push(... _articles.filter(
          article => (_.get(article, 'tags[0].id') === parent.id)
        ));
      });
    };
    translator(parents, children);
    return parents;
  }, [tags, articles]);


  // 渲染菜单列表
  const renderMenuList = () => {
    const recursion = (item, index) => (
      item.type === 'tag' ?
        <Menu.SubMenu
          key={item.id}
          title={<MenuTitle data={item} type="subMenu"/>}>
          {item.children.length !== 0 ?
            item.children.map(v => (recursion(v, index + 1))) :
            <Menu.Item
              key={`${item.id}-empty`}
              className={scss['menu-item-empty']}
            />
          }
          <div
            className={scss['menu-dividing']}
            style={{ left: `${(index * INLINE_INDENT) + 12}px` }}
          />
        </Menu.SubMenu> :
        <Menu.Item key={item.id}>
          <MenuTitle data={item} type="item"/>
        </Menu.Item>
    );
    return list.map(v => (recursion(v, 1)));
  };

  // 选择项时
  const onSelect = ({ key: article }) => {
    dispatch({ type: 'editor/appendWorks', article });
  };

  // 添加 tag
  const addTag = () => {
    dispatch({ type: 'editor/createFictitiousTag', parent: {} });
  };

  // SubMenu 展开/关闭的回调
  const onOpenChange = openKeys => {
    dispatch({
      type: 'editor/setMenu',
      menu: { openKeys },
    });

    const openKey = openKeys.find(v => !SUBMENU_OPEN_HISTORY.includes(v));
    if (openKey) {
      SUBMENU_OPEN_HISTORY.push(openKey);
      dispatch({
        type: 'editor/getTags',
        search: { parent: openKey },
      });
      dispatch({
        type: 'editor/getArticles',
        search: { tag: openKey },
      });
    }
  };

  useEffect(() => {
    dispatch({ type: 'editor/getTags', search: { parent: null } });
  }, []);

  return {
    menu,
    addTag,
    onSelect,
    selectedKeys,
    onOpenChange,
    renderMenuList,
  };
};

export default () => {
  const state = useStateHook();

  return (
    <div className={scss.menu}>
      <Scroll className={scss['menu-middle']}>
        <Menu
          mode="inline"
          inlineCollapsed={false}
          onSelect={state.onSelect}
          inlineIndent={INLINE_INDENT}
          openKeys={state.menu.openKeys}
          onOpenChange={state.onOpenChange}
          selectedKeys={[state.selectedKeys]}>
          {state.renderMenuList()}
        </Menu>
      </Scroll>
      <div
        onClick={state.addTag}
        className={scss['munu-new-tag']} >
        <Icon type="icon-xinzeng" />
      </div>
    </div>
  );
};
