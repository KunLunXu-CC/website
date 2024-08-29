import classNames from "classnames";
import scss from "./tab.module.scss";

import { actions } from "@/store";
import { Icon } from "@kunlunxu/brick";
import { memo, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const Tab = (props) => {
  const dispatch = useDispatch();

  // 读取文章详细内容
  const article = useSelector(
    (state) => state.editor?.articles?.[props.work.articleId],
  );

  // 移除: 点击小叉叉
  const handleClose = useCallback(
    (e) => {
      e.stopPropagation();
      dispatch(actions.editor.removeWorks([article.id]));
    },
    [article.id, dispatch],
  );

  // icon className
  const iconClassName = useMemo(
    () =>
      classNames(scss["tab-icon"], {
        [scss["tab-icon-change"]]: props.work.change,
      }),
    [props.work.change],
  );

  // TODO: 改为 antd 自带的新增、关闭
  return (
    <span className={scss.tab}>
      {article.name}
      <Icon
        type="icon-guanbi6"
        onClick={handleClose}
        className={iconClassName}
      />
    </span>
  );
};

export default memo(Tab);
