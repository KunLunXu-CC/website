import { memo } from "react";
import { Icon } from "@kunlunxu/brick";
import { PHOTO_TYPE } from "@/config/constants";
import { DEFAULT_ACTIVE_MENU_KEY } from "../constants";

import clsx from "clsx";
import useAlbumStore from "../hooks/useAlbumStore";

// 菜单列表数据
const listData = [
  {
    name: "所有",
    icon: "icon-all",
    key: DEFAULT_ACTIVE_MENU_KEY,
  },
  {
    icon: "icon-24",
    name: PHOTO_TYPE.ARTICLE.DESC,
    key: PHOTO_TYPE.ARTICLE.VALUE,
  },
  {
    icon: "icon-touxiang",
    name: PHOTO_TYPE.AVATAR.DESC,
    key: PHOTO_TYPE.AVATAR.VALUE,
  },
  {
    key: PHOTO_TYPE.THUMB.VALUE,
    name: PHOTO_TYPE.THUMB.DESC,
    icon: "icon-genghuanfengmian",
  },
  {
    name: PHOTO_TYPE.DESKTOP.DESC,
    key: PHOTO_TYPE.DESKTOP.VALUE,
    icon: "icon-yunzhuomian-shouye",
  },
  {
    icon: "icon-album-icon",
    name: PHOTO_TYPE.ICON.DESC,
    key: PHOTO_TYPE.ICON.VALUE,
  },
];

const MenuApp = () => {
  const { setActiveMenuKey, activeMenuKey } = useAlbumStore();

  return (
    <div className="h-full overflow-auto space-y-2">
      {listData.map((v) => (
        <div
          key={v.key}
          className={clsx(
            { "bg-black/10": activeMenuKey === v.key },
            "flex text-black/80 text-sm cursor-pointer transition-background px-2 items-center h-8 rounded-md mx-5 hover:bg-black/10",
          )}
          onClick={() => setActiveMenuKey(v.key)}
        >
          <Icon type={v.icon} className="!mr-2" />
          {v.name}
        </div>
      ))}
    </div>
  );
};

export default memo(MenuApp);
