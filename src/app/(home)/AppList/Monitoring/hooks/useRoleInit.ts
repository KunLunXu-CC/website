import { useEffect } from "react";
import { graphql, useFragment } from "@/gql";
import { useQuery } from "@tanstack/react-query";
import { RoleItemFragmentDoc, RolesQuery } from "@/gql/graphql";

import client from "@/gql/client";
import useRoleStore from "./useRoleStore";

// 获取角色列表
const RolesDocument = graphql(`
  query Roles {
    roles {
      list {
        ...RoleItem
      }
    }
  }
`);

const useInitRole = () => {
  const { data: rolesQuery } = useQuery<RolesQuery>({
    staleTime: 0, // 过期时间
    queryKey: ["roles"],
    queryFn: () => client.request(RolesDocument),
  });

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
