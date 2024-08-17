import { useCallback } from "react";
import useUserStore from "../hooks/useUserStore";
import { useUpdateUsersMutation } from "../server";

const useUserSave = () => {
  const { activeUserId, userList } = useUserStore();
  const { mutateAsync: updateUsers, isPending } = useUpdateUsersMutation();

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
