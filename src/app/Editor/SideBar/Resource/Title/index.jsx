import classNames from 'classnames';
import scss from './index.module.scss';

import { actions } from '@store';
import { Icon } from '@kunlunxu/brick';
import { MOVE } from '../../../consts';
import { Dropdown, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useMemo, useCallback, useEffect } from 'react';
import { ARTICLE_STATUS, DATASETSFROM_CODE } from '@config/consts';
import { useCreateFoldersMutation, useCreateArticlesMutation } from '@store/graphql';

// 阻止事件冒泡
const stopPropagation = (e) => e.stopPropagation();

export default (props) => {
  const [createFolders] = useCreateFoldersMutation();
  const [createArticles] = useCreateArticlesMutation();

  const dispatch = useDispatch();
  const editorInputRef = useRef(null);

  const { openKeys, activity } = useSelector((state) => ({
    openKeys: state.editor.side.openKeys,
    activity: state.editor.activity,
  }));

  // 点击下拉菜单
  const handleClickMenu = useCallback(({ item, domEvent }) => {
    stopPropagation(domEvent);
    item.props.data.onClick();
  }, []);

  // 下拉菜单点击事件: 点击创建文件夹
  const handleCreateFolderMenu = useCallback(() => {
    if (!props.data.folders) {
      // 在文件夹上触发下拉框
      dispatch(actions.editor.setSide({
        openKeys: [...openKeys, props.data.id],
      }));

      dispatch(actions.editor.createTmpTag(props.data.id));
    } else {
      // 在文章上触发下拉框
      dispatch(actions.editor.createTmpTag(props.data.folders?.[0].id));
    }
  }, [dispatch, openKeys, props.data.id, props.data.folders]);

  // 下拉菜单点击事件: 点击创建文章
  const handleCreateArticleMenu = useCallback(() => {
    if (!props.data.folders) {
      // 在文件夹上触发下拉框
      dispatch(actions.editor.setSide({
        openKeys: [...openKeys, props.data.id],
      }));

      dispatch(actions.editor.createTmpArticle(props.data.id));
    } else {
      // 在文章上触发下拉框
      dispatch(actions.editor.createTmpArticle(props.data.tags?.[0].id));
    }
  }, [props.data, dispatch, openKeys]);

  // 下拉菜单点击事件: 点击编辑
  const handleEditMenu = useCallback(() => {
    const reducerName = !props.data.folders ? 'addEditorStatusWithTag' : 'addEditorStatusWithArticle';
    dispatch(actions.editor[reducerName](props.data.id));
  }, [dispatch, props.data.id, props.data.folders]);

  // 下拉菜单点击事件: 移动
  const handleMoveMenu = useCallback(() => dispatch({
    data: props.data,
    code: MOVE,
    type: 'modal/openModal',
  }), [dispatch, props.data]);

  // 下拉菜单点击事件: 点击删除
  const handleDeleteMenu = useCallback(() => {
    const type = !props.data.folders
      ? 'editor/removeTag'
      : 'editor/removeArticle';
    dispatch({ ...props.data, type, id: props.data.id });
  }, [dispatch, props.data]);

  // 标题 - 更多 - 下列菜单
  const moreMenu = useMemo(() => {
    const setting = [
      {
        conds: true,
        title: '创建文件夹',
        icon: 'icon-wenjianjia',
        onClick: handleCreateFolderMenu,
      },
      {
        conds: true,
        title: '创建文章',
        icon: 'icon-24',
        onClick: handleCreateArticleMenu,
      },
      {
        conds: true,
        title: '编辑',
        icon: 'icon-baocun',
        onClick: handleEditMenu,
      },
      {
        conds: true,
        title: '移动',
        icon: 'icon-baocun',
        onClick: handleMoveMenu,
      },
      {
        title: '删除',
        icon: 'icon-shanchu',
        onClick: handleDeleteMenu,
        conds: !props.data.children?.length > 0, // TODO： 文件夹未展开, 是无效的
      },
    ];

    const items = setting
      .filter((v) => v.conds)
      .map((data) => ({
        data,
        key: data.title,
        label: (
          <>
            <Icon type={data.icon} />
            {data.title}
          </>
        ),
      }));

    return {
      items,
      onClick: handleClickMenu,
      className: scss['operation-menu'],
    };
  }, [
    handleEditMenu,
    handleMoveMenu,
    handleClickMenu,
    handleDeleteMenu,
    handleCreateFolderMenu,
    handleCreateArticleMenu,
    props.data.children?.length,
  ]);

  // 编辑数据: 根据不同 id、type 设置不同 dispatch 参数
  const handleEdit = useCallback((e) => {
    const name = e.target.value;
    const isNew = props.data.id === 'new';
    const isFolder = !props.data.folders;

    const map = [
      // 1. 新建文件夹
      {
        cond: isFolder && isNew,
        handler: async () => {
          const { data } = await createFolders({ body: [{
            name,
            value: 0,
            parent: props.data.parent?.id,
            code: DATASETSFROM_CODE.ARTICLE_TAG.VALUE,
          }] });
          dispatch(actions.editor.setTags(data.folder?.change));
        },
      },
      // 2. 新建文章
      {
        cond: !isFolder && isNew,
        handler: async () => {
          // name,
          // folders: [props.data.folders?.[0].id],

          const { data } = await  createArticles({ body: [{
            name,
            tags: [props.data.folders?.[0].id],
          }] });

          dispatch(actions.editor.setArticles(data.createArticles?.change));

          // ------------------
          // const currentArticles = yield select((state) => state.editor.articles);
          // delete currentArticles.new;

          // const { change } = body.name ?
          //   yield call(services.createArticles, {
          //     body,
          //     spin: APP_CODE.EDITOR,
          //   }) : { change: [] };

          // yield put({
          //   articles: change.reduce((total, ele) => ({
          //     ...total,
          //     [ele.id]: ele,
          //   }), { ...currentArticles }),
          //   type: 'editor/setArticles',
          // });

          // yield put({
          //   article: change?.[0]?.id,
          //   type: 'editor/appendWorks',
          // });

          // message({
          //   ...MESSAGE_CONFIG,
          //   type: body.name ? 'success' : 'error',
          //   message: body.name ? '操作成功!' : '名称不能为空!',
          // });
        },
      },
    ];

    const { handler } = map.find((v) => v.cond);

    handler();

    // dispatch([
    //   {
    //     // 编辑文件夹
    //     filter: isFolder && !isNew,
    //     dispatchParams: {
    //       body: { name },
    //       id: props.data.id,
    //       type: 'editor/updateTag',
    //     },
    //   },
    //   {
    //     // 新建文件
    //     filter: !isFolder && isNew,
    //     dispatchParams: {
    //       type: 'editor/createArticle',
    //       body: {
    //         name,
    //         folders: [props.data.folders?.[0].id],
    //       },
    //     },
    //   },
    //   {
    //     // 编辑文章
    //     filter: !isFolder && !isNew,
    //     dispatchParams: {
    //       body: { name },
    //       id: props.data.id,
    //       type: 'editor/updateArticle',
    //     },
    //   },
    // ].find((v) => v.filter).dispatchParams);
  }, [dispatch, props.data]);

  // 最外层 className
  const className = useMemo(() => (classNames(scss['menu-title'], {
    [scss['menu-title-article']]: props.data.folders,
    [scss['menu-title-release']]:
      !_.isNumber(activity.selectKey) &&
      props.data.status === ARTICLE_STATUS.RELEASE,
  })), [props.data, activity.selectKey]);

  useEffect(() => {
    editorInputRef.current && editorInputRef.current.focus();
  });

  return (
    <div className={className}>
      <Icon
        type="icon-jiantou"
        className={scss['menu-title-arrow']}
      />
      <Icon type={props.data.folders ? 'icon-24' : 'icon-wenjianjia'} />
      <div className={scss['menu-title-content']}>
        {props.data.editor ? (
          <Input
            onBlur={handleEdit}
            ref={editorInputRef}
            onPressEnter={handleEdit}
            onClick={stopPropagation}
            defaultValue={props.data.name}
            className={scss['menu-title-content-input']}
          />
        ) : props.data.name
        }
      </div>
      {!props.data.editor ? (
        <div className={scss['menu-title-more']}>
          <Dropdown
            menu={moreMenu}
            trigger={['click']}
            placement="bottomRight"
            onClick={stopPropagation}>
            <Icon type="icon-gengduo" />
          </Dropdown>
        </div>
      ) : null
      }
    </div>
  );
};
