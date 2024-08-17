import { useCallback } from "react";
import { useUpdateRolesMutation } from "../server";
import useRoleActive from "./useRoleActive";

const useSaveRole = () => {
  const activeRole = useRoleActive();
  const { mutateAsync: updateRoles, isPending } = useUpdateRolesMutation();

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
