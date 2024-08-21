import client from "@/gql/client";
import useRoleActive from "./useRoleActive";

import { graphql } from "@/gql";
import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import {
  UpdateRolesMutation,
  UpdateRolesMutationVariables,
} from "@/gql/graphql";

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

const useSaveRole = () => {
  const activeRole = useRoleActive();

  const { mutateAsync: updateRoles, isPending } = useMutation<
    UpdateRolesMutation,
    Error,
    UpdateRolesMutationVariables
  >({
    mutationKey: ["updateRoles"],
    mutationFn: (variables) => client.request(UpdateRolesDocument, variables),
  });

  const onSave = useCallback(async () => {
    if (!activeRole) {
      return false;
    }

    await updateRoles({
      conds: { id: activeRole.id },
      body: { auth: activeRole.auth },
    });
  }, [activeRole, updateRoles]);

  return { onSave, isPending };
};

export default useSaveRole;
