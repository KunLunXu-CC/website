import { FC, memo, ReactNode } from "react";
import Error from "./Error";
import Loading from "./Loading";
import scss from "./index.module.scss";

import { getOssUrl } from "@/utils";
import { Image } from "@kunlunxu/brick";

const Background: FC<{ children: ReactNode }> = (props) => (
  <Image
    alt="background"
    error={<Error />}
    loading={<Loading />}
    className={scss.background}
    src={getOssUrl("pro.d2FsbGhhdmVuLWV5cmc1ay5qcGcxNTc3ODc0NzIxMjUz.jpg")}
  >
    {props.children}
  </Image>
);

export default memo(Background);
