import classNames from "classnames";
import scss from "./index.module.scss";
import useRoleSave from "../hooks/useRoleSave";
import useRoleInit from "../hooks/useRoleInit";
import useRoleStore from "../hooks/useRoleStore";
import useRoleActive from "../hooks/useRoleActive";
import { memo } from "react";
import { Checkbox, Spin } from "antd";
import { Image } from "@nextui-org/react";
import { APP_SETTING } from "@/config/constants";

const BottomBtn = () => {
  const { onSave, isPending } = useRoleSave();

  return (
    <div onClick={onSave} className={scss.save}>
      <Spin spinning={isPending}>保存</Spin>
    </div>
  );
};

const Role = () => {
  const activeRole = useRoleActive();
  const { roleList, setActiveRoleAuth, setActiveRoleId } = useRoleStore();

  useRoleInit();

  return (
    <>
      <div className={scss.role}>
        <div className={scss["role-list"]}>
          {roleList.map((role) => (
            <div
              key={role.id}
              className={classNames(scss["role-item"], {
                [scss.active]: activeRole?.id === role.id,
              })}
              onClick={setActiveRoleId.bind(null, role.id)}
            >
              {role.name}
              <span>{role.auth.length}</span>
            </div>
          ))}
        </div>
        <Checkbox.Group
          onChange={setActiveRoleAuth}
          className={scss["auth-list"]}
          value={activeRole?.auth.map((v) => v.code)}
          options={Object.values(APP_SETTING).map((item) => ({
            value: item.code,
            label: (
              <div className={scss["auth-item"]}>
                <Image alt="icon" src={item.icon} />
                {item.name}
              </div>
            ),
          }))}
        />
      </div>
      <BottomBtn />
    </>
  );
};

export default memo(Role);
