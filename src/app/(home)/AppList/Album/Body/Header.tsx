import scss from "./header.module.scss";

import { Input, Badge } from "antd";
import { Icon } from "@kunlunxu/brick";
import { memo } from "react";

const Header = () => (
  <div className={scss.header}>
    <div className={scss.search}>
      <Input
        size="large"
        placeholder="查询"
        prefix={<Icon type="icon-search" />}
      />
    </div>
    <div className={scss.notice}>
      <Badge dot>
        <Icon type="icon-notice" />
      </Badge>
    </div>
  </div>
);

export default memo(Header);
