import client from "@/gql/client";
import { graphql } from "@/gql";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  UsersQuery,
  RolesQuery,
  UpdateUsersMutation,
  RolesQueryVariables,
  UpdateRolesMutation,
  UpdateUsersMutationVariables,
  UpdateRolesMutationVariables,
} from "@/gql/graphql";

// [片段] 接口返回字段
graphql(`
  fragment RoleItem on Role {
    id
    name
    auth
  }
`);

// 获取角色列表
const RolesDocument = graphql(`
  query Roles($search: RoleSearch) {
    roles(search: $search) {
      list {
        ...RoleItem
      }
    }
  }
`);

// 修改角色
const UpdateRolesDocument = graphql(`
  mutation UpdateRoles($body: RoleFields!, $conds: RoleSearch!) {
    updateRoles(body: $body, conds: $conds) {
      change {
        ...RoleItem
      }
    }
  }
`);

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

// 更新用户
const UpdateUsersDocument = graphql(`
  mutation UpdateUsers($body: UserFields!, $conds: UserSearch!) {
    updateUsers(body: $body, conds: $conds) {
      message
      change {
        ...UserItem
      }
    }
  }
`);

// ----------------------------

// 获取角色列表
export const useRolesQuery = (search: RolesQueryVariables) => {
  const query = useQuery<RolesQuery>({
    queryKey: ["roles", search],
    queryFn: () => client.request(RolesDocument, search),
  });
  return query;
};

// 修改角色
export const useUpdateRolesMutation = () => {
  const mutation = useMutation<
    UpdateRolesMutation,
    Error,
    UpdateRolesMutationVariables
  >({
    mutationKey: ["updateRoles"],
    mutationFn: (variables) => client.request(UpdateRolesDocument, variables),
  });

  return mutation;
};

// 获取用户列表
export const useUsersQuery = () => {
  const query = useQuery<UsersQuery>({
    queryKey: ["users"],
    queryFn: () => client.request(UsersDocument),
  });

  return query;
};

// 更新用户
export const useUpdateUsersMutation = () => {
  const mutation = useMutation<
    UpdateUsersMutation,
    Error,
    UpdateUsersMutationVariables
  >({
    mutationKey: ["updateUsers"],
    mutationFn: (variables) => client.request(UpdateUsersDocument, variables),
  });

  return mutation;
};
