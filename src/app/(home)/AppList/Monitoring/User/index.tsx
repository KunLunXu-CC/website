import { getOssUrl } from "@/utils";
import { useCallback } from "react";
import { Image } from "@nextui-org/react";
import { DEFAULT_USER_AVATAR } from "@/config/constants";

import Detail from "./Detail";
import classNames from "classnames";
import scss from "./index.module.scss";
import useUserInit from "../hooks/useUserInit";
import useRoleInit from "../hooks/useRoleInit";
import useUserStore from "../hooks/useUserStore";
import { Maybe } from "@/gql/graphql";
import useUserSave from "../hooks/useUserSave";
import { Spin } from "antd";

const BottomBtn = () => {
  const { onSave, isPending } = useUserSave();

  return (
    <div onClick={onSave} className={scss.save}>
      <Spin spinning={isPending}>保存</Spin>
    </div>
  );
};

const User = () => {
  const { userList, activeUserId, setActiveUserId } = useUserStore();

  const getAvatar = useCallback((avatar?: Maybe<string>) => {
    if (avatar && /^http/.test(avatar)) {
      return avatar;
    }

    return getOssUrl(avatar ?? DEFAULT_USER_AVATAR);
  }, []);

  useUserInit();
  useRoleInit();

  return (
    <>
      <div className={scss.wrapper}>
        <div className={scss["user-list"]}>
          {userList.map((user) => (
            <div
              key={user.id}
              className={classNames(scss.user, {
                [scss.active]: activeUserId === user.id,
              })}
              onClick={setActiveUserId.bind(null, user.id)}
            >
              <Image
                alt="用户头像"
                className={scss.avatar}
                src={getAvatar(user.avatar)}
              />
              <div className={scss["user-name"]}>
                <span>{user.name}</span>
                <span>{user.bio}</span>
              </div>
            </div>
          ))}
        </div>
        <Detail />
      </div>
      <BottomBtn />
    </>
  );
};

export default User;
