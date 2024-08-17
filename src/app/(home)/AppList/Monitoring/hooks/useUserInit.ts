import { useEffect } from "react";
import { useFragment } from "@/gql";
import { useUsersQuery } from "../server";

import useRoleStore from "./useRoleStore";
import { UserItemFragmentDoc } from "@/gql/graphql";
import useUserStore from "./useUserStore";

const useInitRole = () => {
  const { data: usersQuery } = useUsersQuery();

  const { setUserList, setActiveUserId } = useUserStore();

  const userList = useFragment(
    UserItemFragmentDoc,
    usersQuery?.users.list ?? [],
  );

  // 初始化
  useEffect(() => {
    if (userList.length) {
      setUserList(userList);
      setActiveUserId(userList[0].id);
    }
  }, [userList, setUserList, setActiveUserId]);
};

export default useInitRole;
