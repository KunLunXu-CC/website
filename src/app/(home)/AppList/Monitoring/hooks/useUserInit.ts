import { graphql } from "@/gql";
import { useEffect } from "react";
import { useFragment } from "@/gql";
import { useQuery } from "@tanstack/react-query";
import { UserItemFragmentDoc, UsersQuery } from "@/gql/graphql";

import client from "@/gql/client";
import useUserStore from "./useUserStore";

// 用户列表
const UsersDocument = graphql(`
  query Users {
    users {
      list {
        ...UserItem
      }
    }
  }
`);

const useInitRole = () => {
  const { data: usersQuery } = useQuery<UsersQuery>({
    staleTime: 0,
    queryKey: ["users"],
    queryFn: () => client.request(UsersDocument),
  });

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
