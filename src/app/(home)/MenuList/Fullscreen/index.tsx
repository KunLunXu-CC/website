import useFullscreen from "@/hooks/useFullscreen";
import useSettingStore from "@/store/useSettingStore";

import { Icon } from "@kunlunxu/brick";
import { memo } from "react";

const Fullscreen = () => {
  const { onToggle, fulled } = useFullscreen();
  const { menuBar } = useSettingStore();

  if (!menuBar.showFullScreenOnMenu) {
    return null;
  }

  return (
    <Icon
      onClick={onToggle}
      type={fulled ? "icon-compress" : "icon-shipinquanping"}
    />
  );
};

export default memo(Fullscreen);
