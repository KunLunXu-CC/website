import { useEffect } from "react";
import { useFragment } from "@/gql";
import { useRolesQuery } from "../server";
import useRoleStore from "./useRoleStore";
import { RoleItemFragmentDoc } from "@/gql/graphql";

const useInitRole = () => {
  const { data: rolesQuery } = useRolesQuery({});

  const { setRoleList, setActiveRoleId } = useRoleStore();

  const roleList = useFragment(
    RoleItemFragmentDoc,
    rolesQuery?.roles.list ?? [],
  );

  // 初始化
  useEffect(() => {
    if (roleList.length) {
      setRoleList(roleList);
      setActiveRoleId(roleList[0].id);
    }
  }, [roleList, rolesQuery, setActiveRoleId, setRoleList]);
};

export default useInitRole;
