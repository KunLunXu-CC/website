import dayjs from "dayjs";
import scss from "./list.module.scss";

import { Empty } from "antd";
import { getOssUrl } from "@/utils";
import { Image, Icon } from "@kunlunxu/brick";
import { PHOTO_TYPE } from "@/config/constants";
import { memo, useCallback, useMemo } from "react";
// import { useRemovePhotosMutation } from "@/store/graphql";
import useAlbumStore from "../hooks/useAlbumStore";
import { DEFAULT_ACTIVE_MENU_KEY } from "../constants";
import { find } from "lodash";

const List = () => {
  // const [removePhotos] = useRemovePhotosMutation();
  const { phoneList, activeMenuKey } = useAlbumStore();

  const listData = useMemo(
    () =>
      phoneList
        .filter((v) => {
          if (activeMenuKey === DEFAULT_ACTIVE_MENU_KEY) {
            return true;
          }
          return v.type === activeMenuKey;
        })
        .splice(0, 6),
    [activeMenuKey, phoneList],
  );

  // 删除
  const handleDelete = useCallback(async (id: string) => {
    // const { data } = await removePhotos({ conds: { id } });
    // dispatch(actions.photos.removePhotos(data.removePhotos.change));
  }, []);

  return (
    <div className={scss.list}>
      {listData.length > 0 ? (
        listData.map((item) => (
          <div key={item.name} className={scss.item}>
            <div className={scss.preview}>
              <div className={scss["preview-body"]}>
                <Image alt="phone" src={getOssUrl(item.name)} />
              </div>
              <div className={scss["preview-mask"]}>
                <Icon
                  type="icon-shanchu"
                  onClick={handleDelete.bind(null, item.id)}
                />
              </div>
            </div>
            <div className={scss.info}>
              <div className={scss["info-icon"]}>
                <Icon type="icon-genghuanfengmian" />
              </div>
              <div className={scss["info-body"]}>
                <div className={scss["info-body-desc"]}>
                  {find(PHOTO_TYPE, (v) => v.VALUE === item.type)?.DESC ?? ""}
                </div>
                <div className={scss["info-body-time"]}>
                  {dayjs(item.creationTime).format("YYYY / MM / DD")}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <Empty className={scss.empty} />
      )}
    </div>
  );
};

export default memo(List);
