import client from "@/gql/client";
import { graphql } from "@/gql/gql";
import {
  UserInfoQuery,
  PublicKeyQuery,
  LoginMutation,
  LoginMutationVariables,
} from "@/gql/graphql";

import { useQuery, useMutation } from "@tanstack/react-query";

// [片段] 接口返回字段
graphql(`
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

// 获取公钥
const PublicKeyDocument = graphql(`
  query PublicKey {
    publicKey {
      data
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

// 登录
const LoginDocument = graphql(`
  mutation login($account: String, $password: String) {
    login(account: $account, password: $password) {
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

// 获取公钥
export const usePublicKeyQuery = () => {
  const query = useQuery<PublicKeyQuery>({
    queryKey: ["publicKey"],
    queryFn: () => client.request(PublicKeyDocument),
  });

  return query;
};

// 登录
export const useLoginMutation = () => {
  const mutation = useMutation<LoginMutation, Error, LoginMutationVariables>({
    mutationKey: ["login"],
    mutationFn: (variables) => client.request(LoginDocument, variables),
  });

  return mutation;
};
