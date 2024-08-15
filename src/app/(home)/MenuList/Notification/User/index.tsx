import Card from "../Card";
import scss from "./index.module.scss";
import useUserStore from "@/store/useUserStore";
import usePhotosStore from "@/store/usePhotosStore";

import { getOssUrl } from "@/utils";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { Image, Icon } from "@kunlunxu/brick";

const User = () => {
  const router = useRouter();
  const { avatar } = usePhotosStore();
  const { bio, name } = useUserStore();

  // 退出
  const signOut = useCallback(() => router.push("/login"), [router]);

  // 随机头像
  const randomAvatar = useMemo(() => {
    const index = Math.floor(Math.random() * avatar.length);
    return avatar.length > 0 ? getOssUrl(avatar[index].name) : "";
  }, [avatar]);

  return (
    <Card className={scss.user}>
      <div className={scss.avatar}>
        <Image src={randomAvatar} alt="head" />
      </div>
      <div className={scss.name}>{name || "---"}</div>
      <div className={scss.motto}>{bio || "这个人很懒什么都没写"}</div>
      <Icon type="icon-tuichu" onClick={signOut} className={scss["sign-out"]} />
    </Card>
  );
};

export default User;
