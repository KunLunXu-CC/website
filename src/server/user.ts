import client from "@/gql/client";
import { graphql } from "@/gql/gql";
import { UserInfoQuery } from "@/gql/graphql";

import { useQuery } from "@tanstack/react-query";

// [片段] 接口返回字段
const UserFragment = graphql(`
  fragment UserItem on User {
    id
    sex
    bio
    name
    avatar
    account
    role {
      id
      desc
      auth
      name
    }
  }
`);

// 获取用户信息
const UserInfoDocument = graphql(`
  query UserInfo {
    userInfo {
      user {
        ...UserItem
      }
      message
    }
  }
`);

export const useUserInfoQuery = () => {
  const query = useQuery<UserInfoQuery>({
    queryKey: ["userInfo"],
    queryFn: () => client.request(UserInfoDocument),
  });

  return query;
};
