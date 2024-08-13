import dynamic from "next/dynamic";

const Window = dynamic(
  () => import("@kunlunxu/brick").then((mod) => mod.Window),
  { ssr: false },
);

export default Window;
