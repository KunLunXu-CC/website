import { Image } from "@nextui-org/react";
import { APP_SETTING } from "@/config/constants";
import { memo, useCallback, useMemo } from "react";
import { Select, SelectItem, SharedSelection } from "@nextui-org/react";

import scss from "./detail.module.scss";
import useRoleStore from "../hooks/useRoleStore";
import useUserStore from "../hooks/useUserStore";
import useUserActive from "../hooks/useUserActive";

const Detail = () => {
  const { roleList } = useRoleStore();
  const { setActiveUserRole } = useUserStore();
  const activeUser = useUserActive();

  const authList = useMemo(() => {
    if (!activeUser) {
      return [];
    }

    return Object.values(APP_SETTING).filter((ele) =>
      activeUser.role.auth.some((r) => r.code === ele.code),
    );
  }, [activeUser]);

  const handleChangeRole = useCallback(
    async (value: SharedSelection) => {
      // // 1. 调用更新接口
      const currentRole = roleList.find((role) => role.id === value.currentKey);

      if (currentRole) {
        setActiveUserRole(currentRole);
      }
    },
    [roleList, setActiveUserRole],
  );

  if (!activeUser) {
    return null;
  }

  console.log(
    "%c [ activeUser ]-59",
    "font-size:13px; background:pink; color:#bf2c9f;",
    activeUser,
  );

  return (
    <div className={scss.detail}>
      <div className={scss.title}>
        <Select
          className="pr-10"
          selectedKeys={[activeUser.role.id]}
          onSelectionChange={handleChangeRole}
        >
          {roleList.map((role) => (
            <SelectItem key={role.id}>{role.name}</SelectItem>
          ))}
        </Select>
      </div>
      <div className={scss["auth-list"]}>
        {authList.map((v) => (
          <div key={v.code} className={scss["auth-item"]}>
            <Image src={v.icon} alt="应用图标" />
            {v.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Detail);
