import { graphql } from "@/gql/gql";

// [片段] 接口返回字段
export const UserFragment = graphql(`
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
const ss = graphql(/* GraphQL */ `
  query getUserInfo {
    userInfo {
      user {
        ...UserItem
      }
      message
    }
  }
`);
