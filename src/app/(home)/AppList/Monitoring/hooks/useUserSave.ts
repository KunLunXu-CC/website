import client from "@/gql/client";
import useUserStore from "../hooks/useUserStore";

import { graphql } from "@/gql";
import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  UpdateUsersMutation,
  UpdateUsersMutationVariables,
} from "@/gql/graphql";

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

const useUserSave = () => {
  const { activeUserId, userList } = useUserStore();
  const { mutateAsync: updateUsers, isPending } = useMutation<
    UpdateUsersMutation,
    Error,
    UpdateUsersMutationVariables
  >({
    mutationKey: ["updateUsers"],
    mutationFn: (variables) => client.request(UpdateUsersDocument, variables),
  });

  const onSave = useCallback(async () => {
    const currentUser = userList.find((user) => user.id === activeUserId);
    if (!currentUser) {
      return false;
    }

    await updateUsers({
      conds: { id: activeUserId },
      body: { role: currentUser.role.id },
    });
  }, [activeUserId, updateUsers, userList]);

  return { onSave, isPending };
};

export default useUserSave;
