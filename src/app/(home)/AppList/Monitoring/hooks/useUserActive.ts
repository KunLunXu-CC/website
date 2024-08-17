import { useMemo } from "react";
import useUserStore from "./useUserStore";

const useUserActive = () => {
  const { activeUserId, userList } = useUserStore();

  return useMemo(
    () => userList.find((user) => user.id === activeUserId),
    [activeUserId, userList],
  );
};

export default useUserActive;
