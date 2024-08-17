import { useMemo } from "react";
import useRoleStore from "./useRoleStore";

const useActiveRole = () => {
  const { roleList, activeRoleId } = useRoleStore();

  const activeRole = useMemo(
    () => roleList.find((role) => role.id === activeRoleId),
    [activeRoleId, roleList],
  );

  return activeRole;
};

export default useActiveRole;
